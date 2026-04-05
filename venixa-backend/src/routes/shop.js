const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const ctrl = require('../controllers/shopController');

router.get('/products', ctrl.getProducts);
router.get('/cart', authenticate, ctrl.getCart);
router.post('/cart', authenticate, ctrl.addToCart);
router.delete('/cart/:id', authenticate, ctrl.removeFromCart);
router.post('/orders', authenticate, ctrl.placeOrder);
router.get('/orders', authenticate, ctrl.getOrders);
router.post('/wishlist', authenticate, ctrl.toggleWishlist);

module.exports = router;
