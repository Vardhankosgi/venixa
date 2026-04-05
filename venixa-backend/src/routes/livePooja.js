const router = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth');
const ctrl = require('../controllers/livePoojaController');

router.get('/', ctrl.getLivePoojas);
router.post('/', authenticate, authorize('pandit'), ctrl.scheduleLivePooja);
router.post('/:id/join', authenticate, ctrl.joinLivePooja);
router.get('/my-sessions', authenticate, ctrl.getMySessions);

module.exports = router;
