// DOM elements
const toggleViewBtn = document.getElementById('toggleView');
const darkModeToggleBtn = document.getElementById('darkModeToggle');
const showAddLinkFormBtn = document.getElementById('showAddLinkForm');
const addLinkForm = document.getElementById('addLinkForm');
const linkForm = document.getElementById('linkForm');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const tileContainer = document.getElementById('tileContainer');
const listContainer = document.getElementById('listContainer');
const listBody = document.getElementById('listBody');
const detailedViewModal = document.getElementById('detailedViewModal');
const detailedViewTitle = document.getElementById('detailedViewTitle');
const detailedViewContent = document.getElementById('detailedViewContent');
const editInDetailedViewBtn = document.getElementById('editInDetailedView');
const searchInput = document.getElementById('searchInput');
const tagFilter = document.getElementById('tagFilter');
const tagInput = document.getElementById('tagInput');
const tagList = document.getElementById('tagList');
const tagSuggestions = document.getElementById('tagSuggestions');
let isTileView = true;
let isDarkMode = true;

// Function to save dark mode preference
function saveDarkModePreference(isDark) {
    localStorage.setItem('darkMode', isDark);
}

// Function to load dark mode preference
function loadDarkModePreference() {
    const savedPreference = localStorage.getItem('darkMode');
    return savedPreference === null ? true : savedPreference === 'true';
}

// Function to set dark mode
function setDarkMode(isDark) {
    isDarkMode = isDark;
    document.body.classList.toggle('dark-mode', isDark);
    document.body.classList.toggle('light-mode', !isDark);
    darkModeToggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    saveDarkModePreference(isDark);
}

// Initialize dark mode
isDarkMode = loadDarkModePreference();
setDarkMode(isDarkMode);

// Toggle view
toggleViewBtn.addEventListener('click', () => {
    isTileView = !isTileView;
    tileContainer.style.display = isTileView ? 'grid' : 'none';
    listContainer.style.display = isTileView ? 'none' : 'block';
    toggleViewBtn.innerHTML = isTileView ? '<i class="fas fa-th-list"></i>' : '<i class="fas fa-th"></i>';
    toggleViewBtn.title = isTileView ? 'Zur Listenansicht' : 'Zur Kachelansicht';
});

// Toggle theme
darkModeToggleBtn.addEventListener('click', () => {
    setDarkMode(!isDarkMode);
});

// Show/hide add link form
showAddLinkFormBtn.addEventListener('click', () => {
    addLinkForm.style.display = addLinkForm.style.display === 'none' ? 'block' : 'none';
    resetForm();
});

// API functions
async function fetchLinks() {
    const response = await fetch('http://localhost:3000/api/links');
    return await response.json();
}

async function addLink(link) {
    const response = await fetch('http://localhost:3000/api/links', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(link),
    });
    return await response.json();
}

async function updateLink(id, link) {
    const response = await fetch(`http://localhost:3000/api/links/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(link),
    });
    return await response.json();
}

async function deleteLink(id) {
    const response = await fetch(`http://localhost:3000/api/links/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}

function renderTileLinks(links) {
    tileContainer.innerHTML = '';
    links.forEach(link => {
        const linkElement = document.createElement('div');
        linkElement.className = 'link-tile';
        linkElement.dataset.id = link.id;
        linkElement.innerHTML = `
            <div class="title-container">
                <h3 class="editable" data-field="title">${link.title}</h3>
                <button class="edit-title-btn" title="Titel bearbeiten"><i class="fas fa-edit"></i></button>
            </div>
            <div class="url-container">
                <a href="${link.url}" target="_blank" class="editable" data-field="url">${link.url}</a>
                <button class="edit-url-btn" title="URL bearbeiten"><i class="fas fa-edit"></i></button>
            </div>
            <div class="tags-container">
                <div class="tags">${renderTags(link.tags)}</div>
                <button class="edit-tags-btn" title="Tags bearbeiten"><i class="fas fa-edit"></i></button>
            </div>
            <div class="notes-container">
                <div class="notes editable" data-field="notes">${link.notes || ''}</div>
                <button class="edit-notes-btn" title="Notizen bearbeiten"><i class="fas fa-edit"></i></button>
            </div>
            <div class="actions">
                <button class="deleteBtn" title="Löschen"><i class="fas fa-trash-alt"></i></button>
                <button class="saveBtn" title="Speichern"><i class="fas fa-save"></i></button>
                <button class="info-btn" title="Info"><i class="fas fa-info-circle"></i></button>
            </div>
        `;
        tileContainer.appendChild(linkElement);
    });
}

function renderListLinks(links) {
    listBody.innerHTML = '';
    links.forEach(link => {
        const row = document.createElement('tr');
        row.dataset.id = link.id;
        row.innerHTML = `
            <td>
                <div class="title-container">
                    <span class="editable" data-field="title">${link.title}</span>
                    <button class="edit-title-btn" title="Titel bearbeiten"><i class="fas fa-edit"></i></button>
                </div>
            </td>
            <td>
                <div class="url-container">
                    <a href="${link.url}" target="_blank" class="editable" data-field="url">${link.url}</a>
                    <button class="edit-url-btn" title="URL bearbeiten"><i class="fas fa-edit"></i></button>
                </div>
            </td>
            <td>
                <div class="tags-container">
                    <div class="tags">${renderTags(link.tags)}</div>
                    <button class="edit-tags-btn" title="Tags bearbeiten"><i class="fas fa-edit"></i></button>
                </div>
            </td>
            <td>
                <div class="notes-container">
                    <div class="notes editable" data-field="notes">${link.notes || ''}</div>
                    <button class="edit-notes-btn" title="Notizen bearbeiten"><i class="fas fa-edit"></i></button>
                </div>
            </td>
            <td>
                <button class="deleteBtn" title="Löschen"><i class="fas fa-trash-alt"></i></button>
                <button class="saveBtn" title="Speichern"><i class="fas fa-save"></i></button>
                <button class="info-btn" title="Info"><i class="fas fa-info-circle"></i></button>
            </td>
        `;
        listBody.appendChild(row);
    });
}

function renderTags(tags) {
    return tags.map(tag => `<span class="tag">${tag}<span class="remove-tag">×</span></span>`).join('');
}

function renderLinks(links) {
    renderTileLinks(links);
    renderListLinks(links);
    addEditButtonListeners();
}

function resetForm() {
    linkForm.reset();
    document.getElementById('linkId').value = '';
    formTitle.textContent = 'Neuen Link hinzufügen';
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Speichern';
    tagList.innerHTML = '';
}

// Form submission handler
linkForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const id = document.getElementById('linkId').value;
    const title = document.getElementById('linkTitle').value;
    const url = document.getElementById('linkUrl').value;
    const tags = Array.from(tagList.children).map(tag => tag.textContent.slice(0, -1));
    const notes = document.getElementById('linkNotes').value;
    
    const linkData = { title, url, tags, notes };
    
    if (id) {
        // Edit existing link
        await updateLink(id, linkData);
    } else {
        // Add new link
        await addLink(linkData);
    }
    
    filterAndRenderLinks();
    resetForm();
    addLinkForm.style.display = 'none';
    updateTagFilter();
});

// Event listeners for edit, delete, save, and info buttons
document.addEventListener('click', async function(e) {
    const target = e.target.closest('button');
    if (!target) return;

    const linkElement = target.closest('.link-tile') || target.closest('tr');
    if (!linkElement) return;

    const id = linkElement.dataset.id;

    if (target.classList.contains('deleteBtn')) {
        await deleteLink(id);
        filterAndRenderLinks();
        updateTagFilter();
    } else if (target.classList.contains('saveBtn')) {
        await saveInlineEdit(id);
    } else if (target.classList.contains('info-btn')) {
        showDetailedView(id);
    }
});

async function saveInlineEdit(id) {
    const linkElement = document.querySelector(`.link-tile[data-id="${id}"]`) || document.querySelector(`tr[data-id="${id}"]`);
    const title = linkElement.querySelector('[data-field="title"]').textContent;
    const url = linkElement.querySelector('[data-field="url"]').textContent;
    const tags = Array.from(linkElement.querySelectorAll('.tag')).map(tag => tag.textContent.slice(0, -1));
    const notes = linkElement.querySelector('[data-field="notes"]').textContent;

    const linkData = { title, url, tags, notes };
    await updateLink(id, linkData);
    filterAndRenderLinks();
    updateTagFilter();
}

function addEditButtonListeners() {
    const editButtons = document.querySelectorAll('.edit-title-btn, .edit-url-btn, .edit-tags-btn, .edit-notes-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const container = this.closest('div');
            const editableElement = container.querySelector('.editable') || container.querySelector('.tags');
            editableElement.contentEditable = true;
            editableElement.focus();

            // For URL editing, we need to handle the anchor tag
            if (this.classList.contains('edit-url-btn')) {
                const anchor = editableElement;
                const url = anchor.href;
                anchor.removeAttribute('href');
                anchor.textContent = url;
            }
        });
    });

    document.addEventListener('blur', function(e) {
        if (e.target.classList.contains('editable') || e.target.classList.contains('tags')) {
            e.target.contentEditable = false;

            // For URL editing, we need to restore the anchor tag
            if (e.target.dataset.field === 'url') {
                const url = e.target.textContent;
                e.target.href = url;
            }
        }
    }, true);

    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('editable') || e.target.classList.contains('tags')) {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.target.blur();
            }
        }
    });
}

async function showDetailedView(id) {
    const links = await fetchLinks();
    const link = links.find(link => link.id === parseInt(id));
    detailedViewTitle.textContent = link.title;
    detailedViewContent.innerHTML = `
        <p><strong>URL:</strong> <a href="${link.url}" target="_blank">${link.url}</a></p>
        <p><strong>Tags:</strong> ${renderTags(link.tags)}</p>
        <p><strong>Notizen:</strong> ${link.notes || 'Keine Notizen vorhanden'}</p>
        <img src="https://www.google.com/s2/favicons?domain=${link.url}" alt="Favicon" class="favicon">
    `;
    detailedViewModal.style.display = 'block';
    editInDetailedViewBtn.setAttribute('data-id', id);
}

// Close modal when clicking on <span> (x)
document.querySelector('.close').onclick = function() {
    detailedViewModal.style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == detailedViewModal) {
        detailedViewModal.style.display = 'none';
    }
}

// Edit in detailed view
editInDetailedViewBtn.onclick = function() {
    const id = this.getAttribute('data-id');
    editLink(id);
    detailedViewModal.style.display = 'none';
}

// Search and filter functionality
async function filterAndRenderLinks() {
    const links = await fetchLinks();
    const searchTerm = searchInput.value.toLowerCase();
    const selectedTag = tagFilter.value;

    const filteredLinks = links.filter(link => {
        const matchesSearch = link.title.toLowerCase().includes(searchTerm) ||
                              link.url.toLowerCase().includes(searchTerm) ||
                              link.notes.toLowerCase().includes(searchTerm) ||
                              link.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        const matchesTag = selectedTag === '' || link.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    renderLinks(filteredLinks);
}

searchInput.addEventListener('input', filterAndRenderLinks);
tagFilter.addEventListener('change', filterAndRenderLinks);

async function updateTagFilter() {
    const links = await fetchLinks();
    const allTags = new Set();
    links.forEach(link => link.tags.forEach(tag => allTags.add(tag)));

    tagFilter.innerHTML = '<option value="">Alle Tags</option>';
    allTags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = `#${tag}`;
        tagFilter.appendChild(option);
    });
}

// Tag input functionality
tagInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const tag = this.value.trim();
        if (tag) {
            addTag(tag);
            this.value = '';
        }
    }
});

function addTag(tag) {
    const tagElement = document.createElement('span');
    tagElement.className = 'tag';
    tagElement.textContent = tag;
    const removeBtn = document.createElement('span');
    removeBtn.className = 'remove-tag';
    removeBtn.textContent = '×';
    removeBtn.onclick = function() {
        tagList.removeChild(tagElement);
    };
    tagElement.appendChild(removeBtn);
    tagList.appendChild(tagElement);
}

// Tag auto-suggestion
let allTags = [];

async function updateAllTags() {
    const links = await fetchLinks();
    allTags = Array.from(new Set(links.flatMap(link => link.tags)));
}

tagInput.addEventListener('input', function() {
    const input = this.value.toLowerCase();
    if (input) {
        const suggestions = allTags.filter(tag => tag.toLowerCase().startsWith(input));
        showSuggestions(suggestions);
    } else {
        hideSuggestions();
    }
});

function showSuggestions(suggestions) {
    tagSuggestions.innerHTML = '';
    suggestions.forEach(tag => {
        const suggestion = document.createElement('div');
        suggestion.className = 'tag-suggestion';
        suggestion.textContent = tag;
        suggestion.onclick = function() {
            addTag(tag);
            tagInput.value = '';
            hideSuggestions();
        };
        tagSuggestions.appendChild(suggestion);
    });
    tagSuggestions.style.display = 'block';
}

function hideSuggestions() {
    tagSuggestions.style.display = 'none';
}

// Initial render and setup
async function init() {
    await updateAllTags();
    await updateTagFilter();
    await filterAndRenderLinks();
}

init();
