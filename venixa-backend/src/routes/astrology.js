const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const ctrl = require('../controllers/astrologyController');

router.get('/horoscope', ctrl.getHoroscope);
router.post('/consult', authenticate, ctrl.bookConsultation);
router.post('/kundali', authenticate, ctrl.generateKundali);

module.exports = router;
