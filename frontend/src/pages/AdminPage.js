import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '../services/apiService';
import { useAuth } from '../services/authService';
import '../styles/page.css';

function AdminPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [overview, setOverview] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const [userData, overviewData, txData] = await Promise.all([
          authRequest('/admin/users', token, { method: 'GET' }),
          authRequest('/admin/overview', token, { method: 'GET' }),
          authRequest('/admin/transactions', token, { method: 'GET' })
        ]);
        setUsers(userData.users);
        setOverview(overviewData);
        setTransactions(txData.transactions);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, [token]);

  return (
    <div className="app-shell">
      <header className="header-bar">
        <div>
          <strong>Admin dashboard</strong>
          <p>Manage users, view orders, and monitor platform activity.</p>
        </div>
        <button onClick={() => navigate('/')} className="secondary-button">Back</button>
      </header>
      {error && <div className="alert">{error}</div>}
      <section className="admin-summary-grid">
        <div className="admin-card">
          <h4>Total users</h4>
          <p>{users.length}</p>
        </div>
        <div className="admin-card">
          <h4>Data orders</h4>
          <p>{overview ? overview.dataOrders.length : 0}</p>
        </div>
        <div className="admin-card">
          <h4>Wallet funding</h4>
          <p>{overview ? overview.walletFunding.length : 0}</p>
        </div>
        <div className="admin-card">
          <h4>Status counts</h4>
          <p>{overview ? JSON.stringify(overview.statuses) : '-'}</p>
        </div>
      </section>
      <section className="transactions-panel">
        <h3>All transactions</h3>
        {transactions.length === 0 ? (
          <p className="empty-state">No transaction records yet.</p>
        ) : (
          <ul className="transaction-list">
            {transactions.map((tx) => (
              <li key={tx.id}>
                <div>
                  <strong>{tx.type}</strong>
                  <p>{new Date(tx.date).toLocaleString()}</p>
                </div>
                <div>
                  <span>₦{tx.amount.toFixed(2)}</span>
                  <span className={`status ${tx.status}`}>{tx.status}</span>
                </div>
                <div className="transaction-details">
                  <p>ID: {tx.reference}</p>
                  <p>User: {tx.userId}</p>
                  {tx.network && <p>Network: {tx.network}</p>}
                  {tx.phoneNumber && <p>Phone: {tx.phoneNumber}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default AdminPage;
