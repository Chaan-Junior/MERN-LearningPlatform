const Payment = require("../models/payment.model.js");
/*const Course = require("../models/course.model.js");
const User = require("../models/user.model.js");*/
const errorHandler = require('../utils/errorHandler');
const { Vonage } = require('@vonage/server-sdk');


exports.addPayment = (req, res) => {
    if (!req.body.userid || !req.body.courseid || !req.body.amount) {
        return res.status(400).send({
            message: "Required field can not be empty"
        });
    }

    const payment = new Payment({
        userid: req.body.userid,
        courseid: req.body.courseid,
        amount: req.body.amount,
    });

    payment.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while adding payment."
            });
        });
};



exports.test = (req, res) => {
    res.status(200).json({
        message: 'Hello World!'
    });
}
exports.getPayments = (req, res) => {
    Payment.find()
        .then(payments => {
            res.status(200).json(payments);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving payments."
            });
        });
}

exports.sendSMS = (req, res) => {

    const vonage = new Vonage({
        apiKey: "40f005cf",
        apiSecret: "xDkeV0y2ByGffj5q"
      })

    const from = "Vonage APIs";
    const to = "94767765722";
    const text = `Payment received for ${req.body.courseid} = $${req.body.amount}`;
    
    async function sendSMS() {
        await vonage.sms.send({to, from, text})
            .then(resp => { console.log('Message sent successfully'); console.log(resp); res.status(200).json({message: 'Message sent successfully'}); })
            .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
    }
    
    sendSMS();

}