const express = require('express');
const { registerUser, authUser } = require('../controllers/user.controller');

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);

module.exports = router;