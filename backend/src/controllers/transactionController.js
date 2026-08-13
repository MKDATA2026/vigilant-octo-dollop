const { transactions } = require('../repositories/mockDatabase');

function listTransactions(req, res) {
  const items = transactions
    .filter((t) => t.userId === req.user.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json({ transactions: items });
}

module.exports = { listTransactions };
