const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'creative_cure'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

// Route for handling signup
app.post('/sign-up', (req, res) => {
  const { firstname, lastname, username, phone, email, userType, yearsExperience, sessionCost, password } = req.body;

  // Check for existing user
  db.query('SELECT * FROM users WHERE email = ? OR phone = ? OR username = ?', [email, phone, username], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      let response = {};
      if (results.some(user => user.email === email)) response.status = 'existingEmail';
      else if (results.some(user => user.phone === phone)) response.status = 'existingPhone';
      else if (results.some(user => user.username === username)) response.status = 'existingUsername';

      res.json(response);
    } else {
      // Insert new user
      const query = 'INSERT INTO users (firstname, lastname, username, phone, email, userType, yearsExperience, sessionCost, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(query, [firstname, lastname, username, phone, email, userType, yearsExperience, sessionCost, password], (err) => {
        if (err) throw err;
        res.json({ status: 'success' });
      });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
