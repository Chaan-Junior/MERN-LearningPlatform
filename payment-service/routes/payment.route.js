const express = require('express');
const {addPayment, getPayments ,test} = require('../controllers/payment.controller.js');
const router = express.Router();

router.post('/add', addPayment);
router.get('/', getPayments);
router.get('/test', test);

module.exports = router;