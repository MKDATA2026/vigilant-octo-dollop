const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { users, wallets } = require('../repositories/mockDatabase');

function validateEmail(email) {
  return typeof email === 'string' && email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
}

function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }
  if (users.some((user) => user.email === email.toLowerCase())) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  const hashed = bcrypt.hashSync(password, 10);
  const id = uuidv4();
  const user = { id, name, email: email.toLowerCase(), password: hashed, role: 'user' };
  users.push(user);
  wallets.push({ userId: id, balance: 0 });
  res.status(201).json({ message: 'Account created successfully' });
}

function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const user = users.find((u) => u.email === email.toLowerCase());
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
}

module.exports = { register, login };
