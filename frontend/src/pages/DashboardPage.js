import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/authService';
import { authRequest } from '../services/apiService';
import '../styles/page.css';

function DashboardPage() {
  const { token, user, logout } = useAuth();
  const [wallet, setWallet] = useState({ balance: 0 });
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const profile = await authRequest('/users/profile', token, { method: 'GET' });
        setWallet(profile.wallet);
        setTransactions(profile.history.slice(0, 4));
      } catch (err) {
        setError(err.message);
      }
    }
    loadData();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <header className="header-bar">
        <div>
          <strong>MK DATA</strong>
          <p>Digital services for Nigerian mobile customers</p>
        </div>
        <button onClick={handleLogout} className="secondary-button">Logout</button>
      </header>
      {error && <div className="alert">{error}</div>}
      <section className="wallet-card">
        <div>
          <p>Wallet balance</p>
          <h2>₦{wallet.balance.toFixed(2)}</h2>
        </div>
        <div className="card-actions">
          <Link to="/buy-data" className="action-button">Buy Data</Link>
          <Link to="/wallet" className="action-button">Fund Wallet</Link>
          <Link to="/transactions" className="action-button">Transactions</Link>
        </div>
      </section>
      <section className="transactions-panel">
        <div className="panel-header">
          <h3>Recent transactions</h3>
          <Link to="/transactions">View all</Link>
        </div>
        {transactions.length === 0 ? (
          <p className="empty-state">No transactions yet. Start by funding your wallet or buying data.</p>
        ) : (
          <ul className="transaction-list">
            {transactions.map((tx) => (
              <li key={tx.id}>
                <div>
                  <strong>{tx.type === 'wallet_funding' ? 'Wallet funding' : 'Data purchase'}</strong>
                  <p>{new Date(tx.date).toLocaleString()}</p>
                </div>
                <div>
                  <span>₦{tx.amount.toFixed(2)}</span>
                  <span className={`status ${tx.status}`}>{tx.status}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      {user?.role === 'admin' && (
        <section className="admin-panel">
          <h3>Admin quick access</h3>
          <Link to="/admin" className="action-button">Open admin dashboard</Link>
        </section>
      )}
    </div>
  );
}

export default DashboardPage;
