const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
