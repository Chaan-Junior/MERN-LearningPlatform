const express = require('express');
const {addPayment, getPayments ,test, sendSMS} = require('../controllers/payment.controller.js');
const router = express.Router();

router.post('/add', addPayment);
router.get('/', getPayments);
router.get('/test', test);
router.post('/sendSMS', sendSMS);

module.exports = router;