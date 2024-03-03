const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = require('./db');

app.get('/', (req, res) => {
  res.send('Welcome to the React, Node.js, and PostgreSQL application!');
});

app.get('/api/customers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/api/customers', async (req, res) => {
  const { name, age, phone, location } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO customers (customer_name, age, phone, location, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [name, age, phone, location]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});