const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Connect to SQLite database
const db = new sqlite3.Database('./links.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the links database.');
});

// Create links table if not exists
db.run(`CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  tags TEXT,
  notes TEXT
)`);

// API Endpoints

// Get all links
app.get('/api/links', (req, res) => {
  db.all("SELECT * FROM links", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows.map(row => ({
      ...row, 
      tags: row.tags ? row.tags.split(',').filter(tag => tag.trim() !== '') : []
    })));
  });
});

// Add a new link
app.post('/api/links', (req, res) => {
  const { title, url, tags, notes } = req.body;
  
  // Input validation
  if (!title || !url) {
    res.status(400).json({ error: 'Title and URL are required' });
    return;
  }
  
  const tagsString = Array.isArray(tags) ? tags.filter(tag => tag.trim() !== '').join(',') : '';
  
  db.run(`INSERT INTO links (title, url, tags, notes) VALUES (?, ?, ?, ?)`,
    [title, url, tagsString, notes || ''],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Update a link
app.put('/api/links/:id', (req, res) => {
  const { title, url, tags, notes } = req.body;
  
  // Input validation
  if (!title || !url) {
    res.status(400).json({ error: 'Title and URL are required' });
    return;
  }
  
  const tagsString = Array.isArray(tags) ? tags.filter(tag => tag.trim() !== '').join(',') : '';
  
  db.run(`UPDATE links SET title = ?, url = ?, tags = ?, notes = ? WHERE id = ?`,
    [title, url, tagsString, notes || '', req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
});

// Delete a link
app.delete('/api/links/:id', (req, res) => {
  db.run(`DELETE FROM links WHERE id = ?`, req.params.id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

// Serve index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
