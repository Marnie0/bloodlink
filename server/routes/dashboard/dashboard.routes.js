const express = require('express');
const get_dashboard_requests = require('../../controllers/dashboard/get_dashboard_requests.controller');
const create_request = require('../../controllers/dashboard/create_request.controller');
const update_request = require('../../controllers/dashboard/update_request.controller');
const delete_request = require('../../controllers/dashboard/delete_request.controller');

const router = express.Router();

router.get('/requests', get_dashboard_requests);
router.post('/requests', create_request);
router.patch('/requests/:id', update_request);
router.delete('/requests/:id', delete_request);

module.exports = router;
