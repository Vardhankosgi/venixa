const { supabase } = require('../config/supabase');

// GET /pandits?location=&speciality=&available=
const getPandits = async (req, res, next) => {
  try {
    const { location, speciality, available, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('pandit_profiles')
      .select(`
        id, speciality, experience_years, price_per_pooja, languages, is_available, rating, total_reviews,
        users!inner(id, full_name, avatar_url, city)
      `, { count: 'exact' })
      .eq('is_verified', true)
      .range(offset, offset + limit - 1);

    if (location) query = query.ilike('users.city', `%${location}%`);
    if (speciality) query = query.ilike('speciality', `%${speciality}%`);
    if (available === 'true') query = query.eq('is_available', true);

    const { data, error, count } = await query;
    if (error) throw error;

    res.json({ pandits: data, total: count, page: +page, limit: +limit });
  } catch (err) {
    next(err);
  }
};

// GET /pandits/:id
const getPanditById = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('pandit_profiles')
      .select(`*, users!inner(id, full_name, avatar_url, city, phone)`)
      .eq('id', req.params.id)
      .single();

    if (error || !data) return res.status(404).json({ error: 'Pandit not found' });
    res.json({ pandit: data });
  } catch (err) {
    next(err);
  }
};

// GET /pandits/profile (pandit's own profile)
const getMyProfile = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('pandit_profiles')
      .select('*')
      .eq('user_id', req.user.id)
      .single();

    if (error) throw error;
    res.json({ profile: data });
  } catch (err) {
    next(err);
  }
};

// PUT /pandits/profile
const updateMyProfile = async (req, res, next) => {
  try {
    const allowed = ['speciality', 'experience_years', 'price_per_pooja', 'languages', 'bio', 'is_available'];
    const updates = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));

    const { data, error } = await supabase
      .from('pandit_profiles')
      .update(updates)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ profile: data });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPandits, getPanditById, getMyProfile, updateMyProfile };
