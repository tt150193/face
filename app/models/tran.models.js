const mongoose = require('mongoose');

const TranSchema = mongoose.Schema({
    money: String,
    parent: String,
    info: String,
    code: String, 
    date: String,
    id: String,
    source: String,
    source_id: String,
    source_url: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Tran', TranSchema);