const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staticSchema = new Schema({
    name: String,
    data: [Schema.Types.Mixed]
});


module.exports = mongoose.model('Static', staticSchema);
