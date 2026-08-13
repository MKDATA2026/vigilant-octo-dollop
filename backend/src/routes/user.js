const express = require('express');
const { profile } = require('../controllers/userController');
const router = express.Router();

router.get('/profile', profile);

module.exports = router;
