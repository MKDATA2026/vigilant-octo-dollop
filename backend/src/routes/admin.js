const express = require('express');
const { listUsers, getOverview, listTransactions } = require('../controllers/adminController');
const { requireAdmin } = require('../middleware/auth');
const router = express.Router();

router.use(requireAdmin);
router.get('/users', listUsers);
router.get('/overview', getOverview);
router.get('/transactions', listTransactions);

module.exports = router;
