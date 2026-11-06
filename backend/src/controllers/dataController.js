const { dataProducts } = require('../repositories/mockDatabase');
// Placeholder catalogue for UI development only; these are not live provider prices.
function listProducts(req, res) { const networks = ['MTN','AIRTEL','GLO','9MOBILE']; res.json({ products: dataProducts.filter(p => networks.includes(p.network)), mode: 'development-mock', providerConfigured: false }); }
// Do not debit a wallet or report delivery without real VTU provider confirmation.
function purchaseData(req, res) { return res.status(503).json({ error: 'Data purchases are disabled until a VTU provider API is configured and verified.' }); }
module.exports = { listProducts, purchaseData };
