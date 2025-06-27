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

// Get all tags with usage count
app.get('/api/tags', (req, res) => {
  db.all("SELECT * FROM links", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    const tagCounts = {};
    rows.forEach(row => {
      if (row.tags) {
        const tags = row.tags.split(',').filter(tag => tag.trim() !== '');
        tags.forEach(tag => {
          const trimmedTag = tag.trim();
          tagCounts[trimmedTag] = (tagCounts[trimmedTag] || 0) + 1;
        });
      }
    });
    
    const tagsArray = Object.entries(tagCounts).map(([tag, count]) => ({
      name: tag,
      count: count
    }));
    
    res.json(tagsArray);
  });
});

// Rename a tag
app.put('/api/tags/rename', (req, res) => {
  const { oldTag, newTag } = req.body;
  
  if (!oldTag || !newTag) {
    res.status(400).json({ error: 'Old tag and new tag are required' });
    return;
  }
  
  if (oldTag.trim() === newTag.trim()) {
    res.status(400).json({ error: 'New tag must be different from old tag' });
    return;
  }
  
  // Get all links that contain the old tag
  db.all("SELECT * FROM links", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    let updatedCount = 0;
    const updatePromises = [];
    
    rows.forEach(row => {
      if (row.tags && row.tags.includes(oldTag)) {
        const tags = row.tags.split(',').map(tag => tag.trim());
        const updatedTags = tags.map(tag => tag === oldTag.trim() ? newTag.trim() : tag);
        const newTagsString = updatedTags.join(',');
        
        const updatePromise = new Promise((resolve, reject) => {
          db.run(`UPDATE links SET tags = ? WHERE id = ?`, [newTagsString, row.id], function(err) {
            if (err) {
              reject(err);
            } else {
              updatedCount++;
              resolve();
            }
          });
        });
        
        updatePromises.push(updatePromise);
      }
    });
    
    Promise.all(updatePromises)
      .then(() => {
        res.json({ message: `Tag renamed successfully`, updatedLinks: updatedCount });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
});

// Delete a tag
app.delete('/api/tags/:tagName', (req, res) => {
  const tagName = decodeURIComponent(req.params.tagName);
  
  if (!tagName) {
    res.status(400).json({ error: 'Tag name is required' });
    return;
  }
  
  // Get all links that contain the tag
  db.all("SELECT * FROM links", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    let updatedCount = 0;
    const updatePromises = [];
    
    rows.forEach(row => {
      if (row.tags && row.tags.includes(tagName)) {
        const tags = row.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== tagName.trim());
        const newTagsString = tags.join(',');
        
        const updatePromise = new Promise((resolve, reject) => {
          db.run(`UPDATE links SET tags = ? WHERE id = ?`, [newTagsString, row.id], function(err) {
            if (err) {
              reject(err);
            } else {
              updatedCount++;
              resolve();
            }
          });
        });
        
        updatePromises.push(updatePromise);
      }
    });
    
    Promise.all(updatePromises)
      .then(() => {
        res.json({ message: `Tag deleted successfully`, updatedLinks: updatedCount });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
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
