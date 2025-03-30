const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Connect to SQLite database
let db;
try {
  db = new Database('./links.db', { verbose: console.log });
  console.log('Connected to the links database.');
  
  // Create links table if not exists
  db.exec(`CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    tags TEXT,
    notes TEXT
  )`);
} catch (err) {
  console.error('Database connection error:', err.message);
}

// API Endpoints

// Get all links
app.get('/api/links', (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM links").all();
    res.json(rows.map(row => ({...row, tags: row.tags ? row.tags.split(',') : []})));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new link
app.post('/api/links', (req, res) => {
  try {
    const { title, url, tags, notes } = req.body;
    const stmt = db.prepare(`INSERT INTO links (title, url, tags, notes) VALUES (?, ?, ?, ?)`);
    const info = stmt.run(title, url, tags.join(','), notes);
    res.json({ id: info.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a link
app.put('/api/links/:id', (req, res) => {
  try {
    const { title, url, tags, notes } = req.body;
    const stmt = db.prepare(`UPDATE links SET title = ?, url = ?, tags = ?, notes = ? WHERE id = ?`);
    const info = stmt.run(title, url, tags.join(','), notes, req.params.id);
    res.json({ changes: info.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a link
app.delete('/api/links/:id', (req, res) => {
  try {
    const stmt = db.prepare(`DELETE FROM links WHERE id = ?`);
    const info = stmt.run(req.params.id);
    res.json({ changes: info.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
