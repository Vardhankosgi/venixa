const { supabase } = require('../config/supabase');

// GET /courses
const getCourses = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase.from('courses').select('*', { count: 'exact' }).eq('is_published', true).range(offset, offset + limit - 1);
    if (category) query = query.eq('category', category);

    const { data, error, count } = await query;
    if (error) throw error;
    res.json({ courses: data, total: count });
  } catch (err) {
    next(err);
  }
};

// POST /courses/:id/enroll
const enrollCourse = async (req, res, next) => {
  try {
    const { data: existing } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', req.user.id)
      .eq('course_id', req.params.id)
      .single();

    if (existing) return res.status(409).json({ error: 'Already enrolled' });

    const { data, error } = await supabase
      .from('enrollments')
      .insert({ user_id: req.user.id, course_id: req.params.id, progress: 0 })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ enrollment: data });
  } catch (err) {
    next(err);
  }
};

// GET /courses/my-learning
const getMyLearning = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*, courses(*)')
      .eq('user_id', req.user.id)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    res.json({ enrollments: data });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCourses, enrollCourse, getMyLearning };
