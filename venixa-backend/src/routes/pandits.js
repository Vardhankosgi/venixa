const router = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth');
const ctrl = require('../controllers/panditController');

router.get('/', ctrl.getPandits);
router.get('/profile', authenticate, authorize('pandit'), ctrl.getMyProfile);
router.put('/profile', authenticate, authorize('pandit'), ctrl.updateMyProfile);
router.get('/:id', ctrl.getPanditById);

module.exports = router;
