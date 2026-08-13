const { dataProducts, transactions, wallets } = require('../repositories/mockDatabase');
const { createTransactionReference } = require('../services/transactionService');

function listProducts(req, res) {
  const networks = ['MTN', 'AIRTEL', 'GLO', '9MOBILE'];
  const filtered = dataProducts.filter((product) => networks.includes(product.network));
  res.json({ products: filtered });
}

function purchaseData(req, res) {
  const { network, phoneNumber, bundleCode } = req.body;
  if (!network || !phoneNumber || !bundleCode) {
    return res.status(400).json({ error: 'Network, phone number, and bundle selection are required' });
  }
  const product = dataProducts.find((item) => item.code === bundleCode && item.network === network);
  if (!product) {
    return res.status(400).json({ error: 'Invalid bundle selection' });
  }
  if (!/^(?:0|\+234)\d{10}$/.test(phoneNumber)) {
    return res.status(400).json({ error: 'Enter a valid Nigerian phone number' });
  }
  const wallet = wallets.find((w) => w.userId === req.user.id);
  if (!wallet || wallet.balance < product.price) {
    return res.status(400).json({ error: 'Insufficient wallet balance' });
  }
  const reference = createTransactionReference();
  wallet.balance -= product.price;
  const transaction = {
    id: reference,
    userId: req.user.id,
    type: 'data_purchase',
    network,
    phoneNumber,
    bundleCode,
    amount: product.price,
    status: 'success',
    date: new Date().toISOString(),
    reference
  };
  transactions.push(transaction);
  res.json({ message: 'Data purchase completed', transaction });
}

module.exports = { listProducts, purchaseData };
