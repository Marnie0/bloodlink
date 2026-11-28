const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);
