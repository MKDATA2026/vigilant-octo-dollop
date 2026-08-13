import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '../services/apiService';
import { useAuth } from '../services/authService';
import '../styles/page.css';

function WalletPage() {
  const { token } = useAuth();
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const profile = await authRequest('/users/profile', token, { method: 'GET' });
        setBalance(profile.wallet.balance);
        setHistory(profile.history.filter((tx) => tx.type === 'wallet_funding'));
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, [token]);

  const handleFund = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const data = await authRequest('/wallet/fund', token, {
        method: 'POST',
        body: JSON.stringify({ amount })
      });
      setBalance(data.balance);
      setHistory([data.transaction, ...history]);
      setMessage('Wallet funded successfully');
      setAmount('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app-shell">
      <header className="header-bar">
        <div>
          <strong>Wallet</strong>
          <p>Fund your wallet safely with mock payments.</p>
        </div>
        <button onClick={() => navigate('/')} className="secondary-button">Back</button>
      </header>
      <section className="wallet-card">
        <div>
          <p>Current balance</p>
          <h2>₦{balance.toFixed(2)}</h2>
        </div>
      </section>
      {error && <div className="alert">{error}</div>}
      {message && <div className="success">{message}</div>}
      <form className="action-form" onSubmit={handleFund}>
        <label>Funding amount</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Naira amount"
          required
        />
        <button type="submit">Fund wallet</button>
      </form>
      <section className="transactions-panel">
        <h3>Funding history</h3>
        {history.length === 0 ? (
          <p className="empty-state">No wallet funding records yet.</p>
        ) : (
          <ul className="transaction-list">
            {history.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>Funding</strong>
                  <p>{new Date(item.date).toLocaleString()}</p>
                </div>
                <div>
                  <span>₦{item.amount.toFixed(2)}</span>
                  <span className={`status ${item.status}`}>{item.status}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default WalletPage;
