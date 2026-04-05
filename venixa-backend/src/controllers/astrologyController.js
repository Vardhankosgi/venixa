const { supabase } = require('../config/supabase');

// GET /astrology/horoscope?sign=aries
const getHoroscope = async (req, res, next) => {
  try {
    const { sign, period = 'daily' } = req.query;
    const { data, error } = await supabase
      .from('horoscopes')
      .select('*')
      .eq('sign', sign)
      .eq('period', period)
      .gte('valid_until', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) return res.status(404).json({ error: 'Horoscope not found' });
    res.json({ horoscope: data });
  } catch (err) {
    next(err);
  }
};

// POST /astrology/consult
const bookConsultation = async (req, res, next) => {
  try {
    const { astrologer_id, consultation_type, scheduled_at, birth_date, birth_time, birth_place } = req.body;

    const { data, error } = await supabase
      .from('astrology_consultations')
      .insert({ user_id: req.user.id, astrologer_id, consultation_type, scheduled_at, birth_date, birth_time, birth_place })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ consultation: data });
  } catch (err) {
    next(err);
  }
};

// POST /astrology/kundali
const generateKundali = async (req, res, next) => {
  try {
    const { name, birth_date, birth_time, birth_place, partner_name, partner_birth_date, partner_birth_time, partner_birth_place } = req.body;

    const { data, error } = await supabase
      .from('kundali_reports')
      .insert({ user_id: req.user.id, name, birth_date, birth_time, birth_place, partner_name, partner_birth_date, partner_birth_time, partner_birth_place, status: 'pending' })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ report: data, message: 'Kundali generation queued' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getHoroscope, bookConsultation, generateKundali };
