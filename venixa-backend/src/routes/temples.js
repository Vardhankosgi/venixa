const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const ctrl = require('../controllers/templeController');

router.get('/', ctrl.getTemples);
router.post('/:id/book-pooja', authenticate, ctrl.bookTemplePooja);
router.post('/:id/prasad', authenticate, ctrl.orderPrasad);

module.exports = router;
