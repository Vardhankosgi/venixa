const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const ctrl = require('../controllers/vedapatashalaController');

router.get('/courses', ctrl.getCourses);
router.post('/courses/:id/enroll', authenticate, ctrl.enrollCourse);
router.get('/my-learning', authenticate, ctrl.getMyLearning);

module.exports = router;
