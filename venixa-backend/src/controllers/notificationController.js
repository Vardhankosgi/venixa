const { supabase } = require('../config/supabase');

// GET /notifications
const getNotifications = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    res.json({ notifications: data });
  } catch (err) {
    next(err);
  }
};

// PATCH /notifications/:id/read
const markRead = async (req, res, next) => {
  try {
    await supabase.from('notifications').update({ is_read: true }).eq('id', req.params.id).eq('user_id', req.user.id);
    res.json({ message: 'Marked as read' });
  } catch (err) {
    next(err);
  }
};

// PATCH /notifications/read-all
const markAllRead = async (req, res, next) => {
  try {
    await supabase.from('notifications').update({ is_read: true }).eq('user_id', req.user.id).eq('is_read', false);
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getNotifications, markRead, markAllRead };
