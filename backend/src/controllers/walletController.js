const { wallets, transactions } = require('../repositories/mockDatabase');
function getBalance(req, res) { const wallet = wallets.find(w => w.userId === req.user.id); res.json({ balance: wallet ? wallet.balance : 0, mode: 'development-mock' }); }
// Wallet credits require verified server-side payment confirmation; never trust a client amount.
function fundWallet(req, res) { return res.status(503).json({ error: 'Wallet funding is disabled until a payment provider and verified webhook are configured.' }); }
function getWalletHistory(req, res) { const history = transactions.filter(t => t.userId === req.user.id && t.type === 'wallet_funding').sort((a,b) => new Date(b.date)-new Date(a.date)); res.json({ history, mode: 'development-mock' }); }
module.exports = { getBalance, fundWallet, getWalletHistory };
