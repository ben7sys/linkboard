# Linkboard

A modern, feature-rich dashboard for managing and organizing your links and bookmarks.

*Eine moderne, funktionsreiche Dashboard-Anwendung zur Verwaltung und Organisation von Links und Lesezeichen.*

![Linkboard Screenshot](https://via.placeholder.com/800x450?text=Linkboard+Screenshot)

## Features

- **Dual View Modes**: Toggle between tile and list views for different ways to browse your links
- **Dark/Light Mode**: Choose your preferred visual theme
- **Link Management**: Add, edit, and delete links with ease
- **Tagging System**: Organize links with custom tags
- **Search & Filter**: Quickly find links by searching or filtering by tags
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: All links are stored in a local SQLite database

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Icons**: Font Awesome
- **API**: RESTful API endpoints

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/ben7sys/linkboard.git
   cd linkboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

### Adding a Link

1. Click the "+" button in the control panel
2. Fill in the link details (title, URL, notes)
3. Add tags to categorize your link
4. Click "Save"

### Finding Links

- Use the search bar to find links by title, URL, or notes
- Use the tag filter dropdown to filter links by tag
- Click on tags in the tag list to filter by that tag

### Editing Links

1. Click the edit button (pencil icon) on a link
2. Modify the link details
3. Click "Save"

### Switching Views

- Click the view toggle button to switch between tile and list views

### Dark/Light Mode

- Click the dark/light mode toggle button to switch between themes

## API Endpoints

The application provides the following RESTful API endpoints:

- `GET /api/links` - Retrieve all links
- `POST /api/links` - Add a new link
- `PUT /api/links/:id` - Update an existing link
- `DELETE /api/links/:id` - Delete a link

## Project Structure

```
linkboard/
├── css/                  # CSS stylesheets
│   ├── base.css          # Base styles
│   ├── components.css    # Component styles
│   ├── dark-mode.css     # Dark mode theme
│   ├── light-mode.css    # Light mode theme
│   └── layout.css        # Layout styles
├── js/                   # JavaScript modules
│   ├── api.js            # API interaction functions
│   ├── app.js            # Main application logic
│   ├── form.js           # Form handling
│   ├── render.js         # UI rendering functions
│   └── ui.js             # UI element references
├── index.html            # Main HTML file
├── server.js             # Express server
├── links.db              # SQLite database
└── package.json          # Project dependencies
```

## Future Enhancements

Potential improvements for future versions:

1. **Performance Optimization**: Pagination or lazy loading for large link collections
2. **Enhanced Error Handling**: Improved error messages and handling
3. **Input Validation**: Server-side validation for data integrity
4. **Favicon Support**: Automatic fetching and display of website favicons
5. **Testing**: Unit and integration tests
6. **Link Categories**: Enhanced organization with categories
7. **User Authentication**: Multi-user support
8. **Import/Export**: Backup and restore link collections
9. **Usage Analytics**: Track and display link usage statistics
10. **Collections**: Group links into custom collections
11. **Inline Editing**: Edit link details directly in the tile view
12. **Tag Management**: Tools for organizing and managing tags

## License

ISC License
