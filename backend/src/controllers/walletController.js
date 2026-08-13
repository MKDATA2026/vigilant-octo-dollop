const { wallets, transactions } = require('../repositories/mockDatabase');
const { createTransactionReference } = require('../services/transactionService');

function getBalance(req, res) {
  const wallet = wallets.find((w) => w.userId === req.user.id);
  res.json({ balance: wallet ? wallet.balance : 0 });
}

function fundWallet(req, res) {
  const { amount } = req.body;
  const parsedAmount = Number(amount);
  if (!parsedAmount || parsedAmount <= 0) {
    return res.status(400).json({ error: 'Enter a valid funding amount' });
  }
  const wallet = wallets.find((w) => w.userId === req.user.id);
  if (!wallet) {
    return res.status(404).json({ error: 'Wallet not found' });
  }
  const reference = createTransactionReference();
  wallet.balance += parsedAmount;
  const transaction = {
    id: reference,
    userId: req.user.id,
    type: 'wallet_funding',
    amount: parsedAmount,
    status: 'success',
    date: new Date().toISOString(),
    reference
  };
  transactions.push(transaction);
  res.json({ message: 'Wallet funded successfully', balance: wallet.balance, transaction });
}

function getWalletHistory(req, res) {
  const history = transactions
    .filter((t) => t.userId === req.user.id && t.type === 'wallet_funding')
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json({ history });
}

module.exports = { getBalance, fundWallet, getWalletHistory };
