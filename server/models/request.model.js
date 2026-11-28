const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
