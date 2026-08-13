import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '../services/apiService';
import { useAuth } from '../services/authService';
import '../styles/page.css';

function TransactionsPage() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await authRequest('/transactions', token, { method: 'GET' });
        setTransactions(data.transactions);
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
          <strong>Transactions</strong>
          <p>All purchases and wallet records.</p>
        </div>
        <button onClick={() => navigate('/')} className="secondary-button">Back</button>
      </header>
      {error && <div className="alert">{error}</div>}
      <section className="transactions-panel">
        {transactions.length === 0 ? (
          <p className="empty-state">No transactions available.</p>
        ) : (
          <ul className="transaction-list">
            {transactions.map((tx) => (
              <li key={tx.id}>
                <div>
                  <strong>{tx.type === 'wallet_funding' ? 'Wallet' : 'Data'} transaction</strong>
                  <p>{new Date(tx.date).toLocaleString()}</p>
                </div>
                <div>
                  <span>₦{tx.amount.toFixed(2)}</span>
                  <span className={`status ${tx.status}`}>{tx.status}</span>
                </div>
                <div className="transaction-details">
                  <p>ID: {tx.reference}</p>
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

export default TransactionsPage;
