const express = require('express');
const get_all_requests = require('../../controllers/requests/get_all_requests.controller');
const get_single_request = require('../../controllers/requests/get_single_request.controller');

const router = express.Router();

router.get('/', get_all_requests);
router.get('/:id', get_single_request);

module.exports = router;
