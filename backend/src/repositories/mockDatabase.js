const bcrypt = require('bcryptjs');

const users = [];
const wallets = [];
const transactions = [];
const dataProducts = [
  { network: 'MTN', code: 'MTN-1GB', name: 'MTN 1GB', price: 500 },
  { network: 'MTN', code: 'MTN-2GB', name: 'MTN 2GB', price: 900 },
  { network: 'AIRTEL', code: 'AIRTEL-1GB', name: 'Airtel 1GB', price: 450 },
  { network: 'AIRTEL', code: 'AIRTEL-2GB', name: 'Airtel 2GB', price: 850 },
  { network: 'GLO', code: 'GLO-1GB', name: 'Glo 1GB', price: 400 },
  { network: 'GLO', code: 'GLO-2GB', name: 'Glo 2GB', price: 750 },
  { network: '9MOBILE', code: '9MOBILE-1GB', name: '9mobile 1GB', price: 450 },
  { network: '9MOBILE', code: '9MOBILE-2GB', name: '9mobile 2GB', price: 850 }
];

function initializeMocks() {
  const password = bcrypt.hashSync('Password123!', 10);
  const admin = { id: 'admin-1', name: 'Admin', email: 'admin@mkdata.com', password, role: 'admin' };
  users.push(admin);
  wallets.push({ userId: 'admin-1', balance: 10000 });
}

module.exports = {
  users,
  wallets,
  transactions,
  dataProducts,
  initializeMocks
};
