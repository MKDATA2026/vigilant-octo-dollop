const { users, wallets, transactions } = require('../repositories/mockDatabase');

function listUsers(req, res) {
  const accounts = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }));
  res.json({ users: accounts });
}

function getOverview(req, res) {
  const walletFunding = transactions.filter((t) => t.type === 'wallet_funding');
  const dataOrders = transactions.filter((t) => t.type === 'data_purchase');
  const byStatus = transactions.reduce(
    (agg, tx) => ({
      ...agg,
      [tx.status]: (agg[tx.status] || 0) + 1
    }),
    {}
  );
  res.json({ users: users.length, walletFunding, dataOrders, statuses: byStatus });
}

function listTransactions(req, res) {
  const items = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json({ transactions: items });
}

module.exports = { listUsers, getOverview, listTransactions };
