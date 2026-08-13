const { users, wallets, transactions } = require('../repositories/mockDatabase');

function profile(req, res) {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const wallet = wallets.find((w) => w.userId === user.id);
  const history = transactions
    .filter((t) => t.userId === user.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, wallet, history });
}

module.exports = { profile };
