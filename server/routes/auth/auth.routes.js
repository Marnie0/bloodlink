const express = require('express');
const register = require('../../controllers/auth/register.controller');
const login = require('../../controllers/auth/login.controller');
const get_me = require('../../controllers/auth/get_me.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', get_me);

module.exports = router;
