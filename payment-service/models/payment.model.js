const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);



const paymentSchema = new mongoose.Schema({

    userid: {
        type: String,
        required: true
    },
    courseid: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentid: {
        type: Number,
        unique: true,
    },

},{
    timestamps: true
})


paymentSchema.plugin(AutoIncrement, { inc_field: "paymentid" });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;