const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema({
    price: Number,
    prettyPrice: String,
    currencyName: String,
    order: String,
    email: String,
    cryptoInfo: {
        cryptoName: {
            type: String,
            default: ""
        },
        cryptoFullName: {
            type: String,
            default: ""
        },
        cryptoCount: {
            type: String,
            default: ""
        },
        wallet: {
            type: String,
            default: ""
        },
    },
    paymentMethod: String,
    redeemDate: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "pending"
    },
    code: {
        type: String,
        default: ""
    },
    date: {
       type: Number,
       default: new Date().getTime()
   }
});


module.exports = mongoose.model('Coupon', couponSchema);
