const express = require('express');
const add_donation = require('../../controllers/donations/add_donation.controller');
const update_donation = require('../../controllers/donations/update_donation.controller');
const remove_donation = require('../../controllers/donations/remove_donation.controller');
const empty_donations = require('../../controllers/donations/empty_donations.controller');

const router = express.Router();

router.post('/', add_donation);
router.patch('/:id', update_donation);
router.delete('/:id', remove_donation);
router.delete('/', empty_donations);

module.exports = router;
