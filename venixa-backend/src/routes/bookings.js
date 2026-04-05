const router = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth');
const ctrl = require('../controllers/bookingController');

router.use(authenticate);
router.post('/', authorize('devotee'), ctrl.createBooking);
router.get('/', ctrl.getBookings);
router.patch('/:id/status', authorize('pandit', 'admin', 'super_admin'), ctrl.updateBookingStatus);
router.post('/:id/review', authorize('devotee'), ctrl.addReview);

module.exports = router;
