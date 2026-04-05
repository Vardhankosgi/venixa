const { supabase } = require('../config/supabase');

// POST /bookings
const createBooking = async (req, res, next) => {
  try {
    const { pandit_id, pooja_type, scheduled_date, scheduled_time, address, notes } = req.body;

    const { data: pandit } = await supabase
      .from('pandit_profiles')
      .select('price_per_pooja, is_available')
      .eq('id', pandit_id)
      .single();

    if (!pandit) return res.status(404).json({ error: 'Pandit not found' });
    if (!pandit.is_available) return res.status(400).json({ error: 'Pandit is not available' });

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        devotee_id: req.user.id,
        pandit_id,
        pooja_type,
        scheduled_date,
        scheduled_time,
        address,
        notes,
        amount: pandit.price_per_pooja,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ booking: data });
  } catch (err) {
    next(err);
  }
};

// GET /bookings (devotee sees own, pandit sees assigned, admin sees all)
const getBookings = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('bookings')
      .select('*, pandit_profiles(users(full_name, avatar_url)), devotee:users!devotee_id(full_name, avatar_url)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (req.user.role === 'devotee') query = query.eq('devotee_id', req.user.id);
    else if (req.user.role === 'pandit') {
      const { data: profile } = await supabase.from('pandit_profiles').select('id').eq('user_id', req.user.id).single();
      query = query.eq('pandit_id', profile?.id);
    }
    if (status) query = query.eq('status', status);

    const { data, error, count } = await query;
    if (error) throw error;

    res.json({ bookings: data, total: count, page: +page, limit: +limit });
  } catch (err) {
    next(err);
  }
};

// PATCH /bookings/:id/status
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Invalid status' });

    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ booking: data });
  } catch (err) {
    next(err);
  }
};

// POST /bookings/:id/review
const addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const { id: booking_id } = req.params;

    const { data: booking } = await supabase
      .from('bookings')
      .select('pandit_id, status, devotee_id')
      .eq('id', booking_id)
      .single();

    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    if (booking.devotee_id !== req.user.id) return res.status(403).json({ error: 'Not your booking' });
    if (booking.status !== 'completed') return res.status(400).json({ error: 'Can only review completed bookings' });

    const { data, error } = await supabase
      .from('reviews')
      .insert({ booking_id, pandit_id: booking.pandit_id, devotee_id: req.user.id, rating, comment })
      .select()
      .single();

    if (error) throw error;

    // Update pandit average rating
    const { data: reviews } = await supabase.from('reviews').select('rating').eq('pandit_id', booking.pandit_id);
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    await supabase.from('pandit_profiles').update({ rating: avg.toFixed(1), total_reviews: reviews.length }).eq('id', booking.pandit_id);

    res.status(201).json({ review: data });
  } catch (err) {
    next(err);
  }
};

module.exports = { createBooking, getBookings, updateBookingStatus, addReview };
