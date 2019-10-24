const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    id: String,
    name: String,
    counter: String,
    info: String,
}, {
    timestamps: true
});
module.exports = mongoose.model('Customer', CustomerSchema);