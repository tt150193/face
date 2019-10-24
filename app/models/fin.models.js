const mongoose = require('mongoose');

const FinSchema = mongoose.Schema({
    code: String,
    name: String,
    define: String,
    note: String,
    add: Array,
    sub: Array,
}, {
    timestamps: true
});

module.exports = mongoose.model('Fin', FinSchema);