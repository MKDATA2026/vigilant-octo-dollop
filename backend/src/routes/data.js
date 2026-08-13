const express = require('express');
const { listProducts, purchaseData } = require('../controllers/dataController');
const router = express.Router();

router.get('/products', listProducts);
router.post('/purchase', purchaseData);

module.exports = router;
