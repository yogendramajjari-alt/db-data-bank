const express = require('express');
const db = require('../models/database');

const router = express.Router();

// Get all contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await db.queryAsync(
      'SELECT * FROM contacts WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Create contact
router.post('/contacts', async (req, res) => {
  try {
    const { first_name, last_name, email, phone, company } = req.body;
    const result = await db.runAsync(
      'INSERT INTO contacts (user_id, first_name, last_name, email, phone, company) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, first_name, last_name, email, phone, company]
    );
    res.json({ id: result.id, message: 'Contact created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// Get all deals
router.get('/deals', async (req, res) => {
  try {
    const deals = await db.queryAsync(
      'SELECT * FROM deals WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(deals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch deals' });
  }
});

// Create deal
router.post('/deals', async (req, res) => {
  try {
    const { contact_id, title, value, status } = req.body;
    const result = await db.runAsync(
      'INSERT INTO deals (user_id, contact_id, title, value, status) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, contact_id, title, value, status]
    );
    res.json({ id: result.id, message: 'Deal created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create deal' });
  }
});

module.exports = router;