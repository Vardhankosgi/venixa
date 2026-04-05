const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const ctrl = require('../controllers/panchangController');

router.get('/daily', ctrl.getDailyPanchang);
router.get('/festivals', ctrl.getFestivals);
router.get('/muhurat', ctrl.getMuhurat);
router.get('/reminders', authenticate, ctrl.getReminders);
router.post('/reminders', authenticate, ctrl.createReminder);

module.exports = router;
