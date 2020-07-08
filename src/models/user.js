const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    password: String,
    email: String,
    lang: String,
    analitic: {
        type: Schema.Types.Mixed,
        default: {
            GBP: 0,
            EUR: 0
        }
    },
    countCoupon: {
        type: Number,
        default: 0
    },
    admin: {
        type: Number,
        default: 0
    },
    receiveEmail: Boolean
});


module.exports = mongoose.model('User', userSchema);
