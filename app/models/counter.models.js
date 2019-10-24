const mongoose = require('mongoose');

const CounterSchema = mongoose.Schema({
    name: String,
    counter: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Counter', CounterSchema);