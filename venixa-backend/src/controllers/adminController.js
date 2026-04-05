const { supabase } = require('../config/supabase');

// Admin only controllers

// GET /admin/users
const getUsers = async (req, res, next) => {
  try {
    const { role, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('users')
      .select('id, full_name, email, role, is_active, created_at', { count: 'exact' })
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (role) query = query.eq('role', role);

    const { data, error, count } = await query;
    if (error) throw error;
    res.json({ users: data, total: count });
  } catch (err) {
    next(err);
  }
};

// PATCH /admin/users/:id/toggle-active
const toggleUserActive = async (req, res, next) => {
  try {
    const { data: user } = await supabase.from('users').select('is_active').eq('id', req.params.id).single();
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { data, error } = await supabase
      .from('users')
      .update({ is_active: !user.is_active })
      .eq('id', req.params.id)
      .select('id, is_active')
      .single();

    if (error) throw error;
    res.json({ user: data });
  } catch (err) {
    next(err);
  }
};

// PATCH /admin/pandits/:id/verify
const verifyPandit = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('pandit_profiles')
      .update({ is_verified: true })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ profile: data });
  } catch (err) {
    next(err);
  }
};

// GET /admin/stats
const getDashboardStats = async (req, res, next) => {
  try {
    const [users, bookings, orders, pandits] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('bookings').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      supabase.from('pandit_profiles').select('id', { count: 'exact', head: true }).eq('is_verified', true),
    ]);

    res.json({
      stats: {
        total_users: users.count,
        total_bookings: bookings.count,
        total_orders: orders.count,
        verified_pandits: pandits.count,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUsers, toggleUserActive, verifyPandit, getDashboardStats };
