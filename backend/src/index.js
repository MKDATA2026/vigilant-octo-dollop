const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const dataRoutes = require('./routes/data');
const walletRoutes = require('./routes/wallet');
const transactionRoutes = require('./routes/transaction');
const adminRoutes = require('./routes/admin');
const { authenticate } = require('./middleware/auth');
const { initializeMocks } = require('./repositories/mockDatabase');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

initializeMocks();

app.use('/api/auth', authRoutes);
app.use('/api/users', authenticate, userRoutes);
app.use('/api/data', authenticate, dataRoutes);
app.use('/api/wallet', authenticate, walletRoutes);
app.use('/api/transactions', authenticate, transactionRoutes);
app.use('/api/admin', authenticate, adminRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`MK DATA backend running on port ${port}`);
});
