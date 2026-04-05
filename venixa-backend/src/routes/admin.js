const router = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth');
const ctrl = require('../controllers/adminController');

router.use(authenticate, authorize('admin', 'super_admin'));
router.get('/stats', ctrl.getDashboardStats);
router.get('/users', ctrl.getUsers);
router.patch('/users/:id/toggle-active', ctrl.toggleUserActive);
router.patch('/pandits/:id/verify', ctrl.verifyPandit);

module.exports = router;
