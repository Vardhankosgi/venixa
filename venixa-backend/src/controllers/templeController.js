const { supabase } = require('../config/supabase');

// GET /temples
const getTemples = async (req, res, next) => {
  try {
    const { city, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase.from('temples').select('*', { count: 'exact' }).range(offset, offset + limit - 1);
    if (city) query = query.ilike('city', `%${city}%`);

    const { data, error, count } = await query;
    if (error) throw error;
    res.json({ temples: data, total: count });
  } catch (err) {
    next(err);
  }
};

// POST /temples/:id/book-pooja
const bookTemplePooja = async (req, res, next) => {
  try {
    const { pooja_type, scheduled_date, devotee_name, gotra } = req.body;

    const { data, error } = await supabase
      .from('temple_bookings')
      .insert({ temple_id: req.params.id, user_id: req.user.id, pooja_type, scheduled_date, devotee_name, gotra })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ booking: data });
  } catch (err) {
    next(err);
  }
};

// POST /temples/:id/prasad
const orderPrasad = async (req, res, next) => {
  try {
    const { shipping_address, quantity = 1 } = req.body;

    const { data: temple } = await supabase.from('temples').select('prasad_price').eq('id', req.params.id).single();
    if (!temple) return res.status(404).json({ error: 'Temple not found' });

    const { data, error } = await supabase
      .from('prasad_orders')
      .insert({ temple_id: req.params.id, user_id: req.user.id, shipping_address, quantity, amount: temple.prasad_price * quantity })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ order: data });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTemples, bookTemplePooja, orderPrasad };
