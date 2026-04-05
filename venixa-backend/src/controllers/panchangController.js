const { supabase } = require('../config/supabase');

// GET /panchang/daily?date=2024-04-05
const getDailyPanchang = async (req, res, next) => {
  try {
    const date = req.query.date || new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('panchang')
      .select('*')
      .eq('date', date)
      .single();

    if (error) return res.status(404).json({ error: 'Panchang not found for this date' });
    res.json({ panchang: data });
  } catch (err) {
    next(err);
  }
};

// GET /panchang/festivals
const getFestivals = async (req, res, next) => {
  try {
    const { year = new Date().getFullYear(), month } = req.query;

    let query = supabase.from('festivals').select('*').gte('date', `${year}-01-01`).lte('date', `${year}-12-31`).order('date');
    if (month) query = query.gte('date', `${year}-${month.padStart(2, '0')}-01`).lte('date', `${year}-${month.padStart(2, '0')}-31`);

    const { data, error } = await query;
    if (error) throw error;
    res.json({ festivals: data });
  } catch (err) {
    next(err);
  }
};

// GET /panchang/muhurat?date=&type=
const getMuhurat = async (req, res, next) => {
  try {
    const { date, type } = req.query;

    let query = supabase.from('muhurats').select('*').eq('date', date);
    if (type) query = query.eq('type', type);

    const { data, error } = await query;
    if (error) throw error;
    res.json({ muhurats: data });
  } catch (err) {
    next(err);
  }
};

// POST /panchang/reminders
const createReminder = async (req, res, next) => {
  try {
    const { title, reminder_date, reminder_time, type } = req.body;

    const { data, error } = await supabase
      .from('reminders')
      .insert({ user_id: req.user.id, title, reminder_date, reminder_time, type })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ reminder: data });
  } catch (err) {
    next(err);
  }
};

// GET /panchang/reminders
const getReminders = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .eq('user_id', req.user.id)
      .order('reminder_date');

    if (error) throw error;
    res.json({ reminders: data });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDailyPanchang, getFestivals, getMuhurat, createReminder, getReminders };
