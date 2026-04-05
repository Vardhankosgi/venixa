const { supabase } = require('../config/supabase');

// GET /live-pooja
const getLivePoojas = async (req, res, next) => {
  try {
    const { status = 'scheduled', page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { data, error, count } = await supabase
      .from('live_poojas')
      .select('*, pandit:pandit_profiles(users(full_name, avatar_url))', { count: 'exact' })
      .eq('status', status)
      .order('scheduled_at', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    res.json({ poojas: data, total: count });
  } catch (err) {
    next(err);
  }
};

// POST /live-pooja (pandit schedules)
const scheduleLivePooja = async (req, res, next) => {
  try {
    const { title, description, scheduled_at, duration_minutes, price, max_participants } = req.body;

    const { data: profile } = await supabase
      .from('pandit_profiles')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (!profile) return res.status(403).json({ error: 'Only pandits can schedule live poojas' });

    const { data, error } = await supabase
      .from('live_poojas')
      .insert({ pandit_id: profile.id, title, description, scheduled_at, duration_minutes, price, max_participants })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ pooja: data });
  } catch (err) {
    next(err);
  }
};

// POST /live-pooja/:id/join
const joinLivePooja = async (req, res, next) => {
  try {
    const { data: pooja } = await supabase
      .from('live_poojas')
      .select('id, max_participants, participant_count, status')
      .eq('id', req.params.id)
      .single();

    if (!pooja) return res.status(404).json({ error: 'Pooja not found' });
    if (pooja.status !== 'scheduled') return res.status(400).json({ error: 'Pooja is not available for joining' });
    if (pooja.participant_count >= pooja.max_participants) return res.status(400).json({ error: 'Pooja is full' });

    const { data, error } = await supabase
      .from('live_pooja_participants')
      .insert({ pooja_id: req.params.id, user_id: req.user.id })
      .select()
      .single();

    if (error) throw error;

    await supabase.from('live_poojas').update({ participant_count: pooja.participant_count + 1 }).eq('id', req.params.id);

    res.status(201).json({ participant: data });
  } catch (err) {
    next(err);
  }
};

// GET /live-pooja/my-sessions
const getMySessions = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('live_pooja_participants')
      .select('*, live_poojas(*, pandit:pandit_profiles(users(full_name)))')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ sessions: data });
  } catch (err) {
    next(err);
  }
};

module.exports = { getLivePoojas, scheduleLivePooja, joinLivePooja, getMySessions };
