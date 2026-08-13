const express = require('express');
const { getBalance, fundWallet, getWalletHistory } = require('../controllers/walletController');
const router = express.Router();

router.get('/balance', getBalance);
router.post('/fund', fundWallet);
router.get('/history', getWalletHistory);

module.exports = router;
