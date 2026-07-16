const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./models/database');
const authRoutes = require('./routes/auth');
const crmRoutes = require('./routes/crm');
const authMiddleware = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/crm', authMiddleware, crmRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});