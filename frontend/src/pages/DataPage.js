import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '../services/apiService';
import { useAuth } from '../services/authService';
import '../styles/page.css';

const networks = ['MTN', 'AIRTEL', 'GLO', '9MOBILE'];

function DataPage() {
  const { token, logout } = useAuth();
  const [selectedNetwork, setSelectedNetwork] = useState('MTN');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bundles, setBundles] = useState([]);
  const [selectedBundle, setSelectedBundle] = useState('');
  const [message, setMessage] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const productData = await authRequest('/data/products', token, { method: 'GET' });
        setBundles(productData.products.filter((p) => p.network === selectedNetwork));
      } catch (err) {
        setError(err.message);
        if (err.message.includes('token')) logout();
      }
    }
    load();
  }, [selectedNetwork, token]);

  useEffect(() => {
    async function fetchWallet() {
      const profile = await authRequest('/users/profile', token, { method: 'GET' });
      setWalletBalance(profile.wallet.balance);
    }
    fetchWallet();
  }, [token]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      if (!selectedBundle) {
        setError('Please choose a bundle.');
        return;
      }
      if (!phoneNumber) {
        setError('Enter recipient phone number.');
        return;
      }
      const result = await authRequest('/data/purchase', token, {
        method: 'POST',
        body: JSON.stringify({ network: selectedNetwork, phoneNumber, bundleCode: selectedBundle })
      });
      setMessage(result.message);
      setWalletBalance(result.transaction ? walletBalance - result.transaction.amount : walletBalance);
    } catch (err) {
      setError(err.message);
    }
  };

  const currentBundle = bundles.find((item) => item.code === selectedBundle);

  return (
    <div className="app-shell">
      <header className="header-bar">
        <div>
          <strong>Buy data</strong>
          <p>Choose the network, recipient, and bundle.</p>
        </div>
        <button onClick={() => navigate('/')} className="secondary-button">Back</button>
      </header>
      <section className="wallet-card">
        <div>
          <p>Wallet balance</p>
          <h2>₦{walletBalance.toFixed(2)}</h2>
        </div>
      </section>
      {error && <div className="alert">{error}</div>}
      {message && <div className="success">{message}</div>}
      <form className="action-form" onSubmit={handlePurchase}>
        <label>Network</label>
        <select value={selectedNetwork} onChange={(e) => setSelectedNetwork(e.target.value)}>
          {networks.map((network) => (
            <option key={network} value={network}>{network}</option>
          ))}
        </select>
        <label>Phone number</label>
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="08123456789"
          required
        />
        <label>Data bundle</label>
        <select value={selectedBundle} onChange={(e) => setSelectedBundle(e.target.value)}>
          <option value="">Select bundle</option>
          {bundles.map((bundle) => (
            <option key={bundle.code} value={bundle.code}>
              {bundle.name} - ₦{bundle.price}
            </option>
          ))}
        </select>
        {currentBundle && (
          <div className="bundle-summary">
            <strong>Price: ₦{currentBundle.price}</strong>
          </div>
        )}
        <button type="submit">Confirm purchase</button>
      </form>
    </div>
  );
}

export default DataPage;
