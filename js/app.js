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
const availableTagsList = document.getElementById('availableTagsList');
const manageTagsBtn = document.getElementById('manageTagsBtn');
const tagManagementModal = document.getElementById('tagManagementModal');
const closeTagModal = document.getElementById('closeTagModal');
const tagManagementList = document.getElementById('tagManagementList');
let isTileView = true;
let isDarkMode = true;

// Function to save dark mode preference
function saveDarkModePreference(isDark) {
    localStorage.setItem('darkMode', isDark);
}

// Function to detect system preference
function getSystemPreference() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Function to load dark mode preference
function loadDarkModePreference() {
    const savedPreference = localStorage.getItem('darkMode');
    if (savedPreference === null) {
        // No saved preference, use system preference
        return getSystemPreference();
    }
    return savedPreference === 'true';
}

// Function to set dark mode
function setDarkMode(isDark) {
    isDarkMode = isDark;
    document.body.classList.toggle('dark-mode', isDark);
    document.body.classList.toggle('light-mode', !isDark);
    
    // Update button icon with better accessibility
    const icon = isDark ? 'fa-sun' : 'fa-moon';
    const title = isDark ? 'Zu Light Mode wechseln' : 'Zu Dark Mode wechseln';
    darkModeToggleBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    darkModeToggleBtn.title = title;
    darkModeToggleBtn.setAttribute('aria-label', title);
    
    saveDarkModePreference(isDark);
}

// Listen for system preference changes
if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        const savedPreference = localStorage.getItem('darkMode');
        if (savedPreference === null) {
            setDarkMode(e.matches);
        }
    });
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
    const isVisible = addLinkForm.style.display !== 'none';
    addLinkForm.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
        resetForm();
    }
});

// Cancel button functionality
document.getElementById('cancelBtn').addEventListener('click', () => {
    // Ask for confirmation if form has content
    const hasContent = document.getElementById('linkTitle').value.trim() ||
                      document.getElementById('linkUrl').value.trim() ||
                      document.getElementById('linkNotes').value.trim() ||
                      tagList.children.length > 0;
    
    if (hasContent && !confirm('Möchten Sie das Bearbeiten wirklich abbrechen? Alle Änderungen gehen verloren.')) {
        return;
    }
    
    addLinkForm.style.display = 'none';
    resetForm();
});

// Close form when clicking outside (but not when interacting with tags)
document.addEventListener('click', (e) => {
    if (addLinkForm.style.display === 'block' && 
        !addLinkForm.contains(e.target) && 
        !showAddLinkFormBtn.contains(e.target) &&
        !e.target.classList.contains('remove-tag') &&
        !e.target.classList.contains('tag') &&
        !e.target.classList.contains('available-tag') &&
        !e.target.classList.contains('tag-suggestion')) {
        
        // Ask for confirmation if form has content
        const hasContent = document.getElementById('linkTitle').value.trim() ||
                          document.getElementById('linkUrl').value.trim() ||
                          document.getElementById('linkNotes').value.trim() ||
                          tagList.children.length > 0;
        
        if (hasContent && !confirm('Möchten Sie das Bearbeiten wirklich abbrechen? Alle Änderungen gehen verloren.')) {
            return;
        }
        
        addLinkForm.style.display = 'none';
        resetForm();
    }
});

// Close form with Escape key (with confirmation if form has content)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && addLinkForm.style.display === 'block') {
        // Ask for confirmation if form has content
        const hasContent = document.getElementById('linkTitle').value.trim() ||
                          document.getElementById('linkUrl').value.trim() ||
                          document.getElementById('linkNotes').value.trim() ||
                          tagList.children.length > 0;
        
        if (hasContent && !confirm('Möchten Sie das Bearbeiten wirklich abbrechen? Alle Änderungen gehen verloren.')) {
            return;
        }
        
        addLinkForm.style.display = 'none';
        resetForm();
    }
});

// API functions with error handling and loading states
let isLoading = false;

function showLoading() {
    isLoading = true;
    document.body.style.cursor = 'wait';
}

function hideLoading() {
    isLoading = false;
    document.body.style.cursor = 'default';
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    if (type === 'success') notification.style.backgroundColor = '#28a745';
    else if (type === 'error') notification.style.backgroundColor = '#dc3545';
    else notification.style.backgroundColor = '#007bff';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

async function fetchLinks() {
    try {
        showLoading();
        const response = await fetch('/api/links');
        if (!response.ok) throw new Error('Failed to fetch links');
        return await response.json();
    } catch (error) {
        showNotification('Fehler beim Laden der Links: ' + error.message, 'error');
        return [];
    } finally {
        hideLoading();
    }
}

async function addLink(link) {
    try {
        showLoading();
        const response = await fetch('/api/links', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(link),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to add link');
        }
        showNotification('Link erfolgreich hinzugefügt!', 'success');
        return await response.json();
    } catch (error) {
        showNotification('Fehler beim Hinzufügen: ' + error.message, 'error');
        throw error;
    } finally {
        hideLoading();
    }
}

async function updateLink(id, link) {
    try {
        showLoading();
        const response = await fetch(`/api/links/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(link),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update link');
        }
        showNotification('Link erfolgreich aktualisiert!', 'success');
        return await response.json();
    } catch (error) {
        showNotification('Fehler beim Aktualisieren: ' + error.message, 'error');
        throw error;
    } finally {
        hideLoading();
    }
}

async function deleteLink(id) {
    if (!confirm('Möchten Sie diesen Link wirklich löschen?')) {
        return null;
    }
    
    try {
        showLoading();
        const response = await fetch(`/api/links/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete link');
        showNotification('Link erfolgreich gelöscht!', 'success');
        return await response.json();
    } catch (error) {
        showNotification('Fehler beim Löschen: ' + error.message, 'error');
        throw error;
    } finally {
        hideLoading();
    }
}

function renderTileLinks(links) {
    tileContainer.innerHTML = '';
    links.forEach(link => {
        const linkElement = document.createElement('div');
        linkElement.className = 'link-tile';
        linkElement.dataset.id = link.id;
        linkElement.innerHTML = `
            <div class="link-header">
                <h3 title="${link.title}">${link.title}</h3>
                <img src="https://www.google.com/s2/favicons?domain=${link.url}" alt="Favicon" class="favicon" onerror="this.style.display='none'">
            </div>
            <div class="link-url">
                <a href="${link.url}" target="_blank" title="${link.url}">${link.url}</a>
            </div>
            <div class="link-tags">
                ${renderTags(link.tags)}
            </div>
            <div class="link-notes">
                ${link.notes || ''}
            </div>
            <div class="link-actions">
                <button class="editBtn" title="Bearbeiten"><i class="fas fa-edit"></i></button>
                <button class="deleteBtn" title="Löschen"><i class="fas fa-trash-alt"></i></button>
                <button class="info-btn" title="Details"><i class="fas fa-info-circle"></i></button>
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
    // For standard view - WITHOUT × symbol
    return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

function renderEditableTags(tags) {
    // For edit mode - WITH × symbol and functionality
    return tags.map(tag => `<span class="tag editable-tag">${tag}<span class="remove-tag">×</span></span>`).join('');
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
    updateSelectedTagsDisplay();
    hideSuggestions();
    addLinkForm.classList.remove('has-changes');
}

// Function to check if form has content and mark as changed
function checkFormChanges() {
    const hasContent = document.getElementById('linkTitle').value.trim() ||
                      document.getElementById('linkUrl').value.trim() ||
                      document.getElementById('linkNotes').value.trim() ||
                      tagList.children.length > 0;
    
    if (hasContent) {
        addLinkForm.classList.add('has-changes');
    } else {
        addLinkForm.classList.remove('has-changes');
    }
}

// Add event listeners to form inputs to detect changes
document.getElementById('linkTitle').addEventListener('input', checkFormChanges);
document.getElementById('linkUrl').addEventListener('input', checkFormChanges);
document.getElementById('linkNotes').addEventListener('input', checkFormChanges);

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
        const result = await deleteLink(id);
        if (result !== null) {
            filterAndRenderLinks();
            updateTagFilter();
        }
    } else if (target.classList.contains('editBtn')) {
        editLink(id);
    } else if (target.classList.contains('saveBtn')) {
        await saveInlineEdit(id);
    } else if (target.classList.contains('info-btn')) {
        showDetailedView(id);
    }
});

// Edit link function
async function editLink(id) {
    const links = await fetchLinks();
    const link = links.find(link => link.id === parseInt(id));
    
    if (!link) return;
    
    // Populate form with existing data
    document.getElementById('linkId').value = link.id;
    document.getElementById('linkTitle').value = link.title;
    document.getElementById('linkUrl').value = link.url;
    document.getElementById('linkNotes').value = link.notes || '';
    
    // Clear and populate tags
    tagList.innerHTML = '';
    link.tags.forEach(tag => addTag(tag));
    
    // Update form title and button
    formTitle.textContent = 'Link bearbeiten';
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Aktualisieren';
    
    // Show form
    addLinkForm.style.display = 'block';
    
    // Scroll to form
    addLinkForm.scrollIntoView({ behavior: 'smooth' });
}

async function saveInlineEdit(id) {
    const linkElement = document.querySelector(`.link-tile[data-id="${id}"]`) || document.querySelector(`tr[data-id="${id}"]`);
    const title = linkElement.querySelector('[data-field="title"]').textContent;
    const url = linkElement.querySelector('[data-field="url"]').textContent;
    // For standard view tags (without × symbol), get the full text content
    const tags = Array.from(linkElement.querySelectorAll('.tag')).map(tag => tag.textContent.trim());
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
    if (event.target == tagManagementModal) {
        tagManagementModal.style.display = 'none';
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
    
    // Update available tags display
    updateAvailableTags(Array.from(allTags));
}

// Update available tags display
function updateAvailableTags(tags) {
    availableTagsList.innerHTML = '';
    
    if (tags.length === 0) {
        availableTagsList.innerHTML = '<span style="color: #999; font-style: italic;">Noch keine Tags vorhanden</span>';
        return;
    }
    
    tags.sort().forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'available-tag';
        tagElement.textContent = tag;
        tagElement.title = `Klicken um "${tag}" hinzuzufügen`;
        
        // Check if tag is already selected
        const selectedTags = Array.from(tagList.children).map(t => t.textContent.slice(0, -1));
        if (selectedTags.includes(tag)) {
            tagElement.classList.add('selected');
        }
        
        tagElement.onclick = function() {
            if (!selectedTags.includes(tag)) {
                addTag(tag);
                updateSelectedTagsDisplay();
            }
        };
        
        availableTagsList.appendChild(tagElement);
    });
}

// Update selected tags display
function updateSelectedTagsDisplay() {
    const selectedTags = Array.from(tagList.children).map(t => t.textContent.slice(0, -1));
    
    // Update available tags to show selected state
    document.querySelectorAll('.available-tag').forEach(tagEl => {
        if (selectedTags.includes(tagEl.textContent)) {
            tagEl.classList.add('selected');
        } else {
            tagEl.classList.remove('selected');
        }
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
    // Check if tag already exists
    const existingTags = Array.from(tagList.children).map(t => t.textContent.slice(0, -1));
    if (existingTags.includes(tag)) {
        return;
    }
    
    const tagElement = document.createElement('span');
    tagElement.className = 'tag';
    tagElement.textContent = tag;
    const removeBtn = document.createElement('span');
    removeBtn.className = 'remove-tag';
    removeBtn.textContent = '×';
    removeBtn.onclick = function() {
        tagList.removeChild(tagElement);
        updateSelectedTagsDisplay();
        checkFormChanges(); // Check for changes when tag is removed
    };
    tagElement.appendChild(removeBtn);
    tagList.appendChild(tagElement);
    
    // Update the available tags display
    updateSelectedTagsDisplay();
    checkFormChanges(); // Check for changes when tag is added
}

// Tag auto-suggestion
let allTags = [];

async function updateAllTags() {
    const links = await fetchLinks();
    allTags = Array.from(new Set(links.flatMap(link => link.tags)));
    // Don't show suggestions automatically - only when user types
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
    if (suggestions.length === 0) {
        hideSuggestions();
        return;
    }
    
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
    tagSuggestions.classList.add('show');
}

function hideSuggestions() {
    tagSuggestions.classList.remove('show');
}

// Tag Management functionality
manageTagsBtn.addEventListener('click', showTagManagement);
closeTagModal.addEventListener('click', () => {
    tagManagementModal.style.display = 'none';
});


async function showTagManagement() {
    try {
        showLoading();
        const response = await fetch('/api/tags');
        if (!response.ok) throw new Error('Failed to fetch tags');
        const tags = await response.json();
        
        renderTagManagement(tags);
        tagManagementModal.style.display = 'block';
    } catch (error) {
        showNotification('Fehler beim Laden der Tags: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

function renderTagManagement(tags) {
    if (tags.length === 0) {
        tagManagementList.innerHTML = '<p style="text-align: center; color: #999; font-style: italic;">Noch keine Tags vorhanden</p>';
        return;
    }
    
    tagManagementList.innerHTML = '';
    tags.sort((a, b) => a.name.localeCompare(b.name)).forEach(tag => {
        const tagItem = document.createElement('div');
        tagItem.className = 'tag-management-item';
        tagItem.innerHTML = `
            <div class="tag-info">
                <span class="tag-name" data-original="${tag.name}">${tag.name}</span>
                <span class="tag-count">(${tag.count} Link${tag.count !== 1 ? 's' : ''})</span>
            </div>
            <div class="tag-actions">
                <button class="rename-tag-btn" title="Umbenennen" data-tag="${tag.name}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-tag-btn" title="Löschen" data-tag="${tag.name}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        tagManagementList.appendChild(tagItem);
    });
    
    // Add event listeners for rename and delete buttons
    addTagManagementListeners();
}

function addTagManagementListeners() {
    // Rename tag functionality
    document.querySelectorAll('.rename-tag-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tagName = e.target.closest('button').dataset.tag;
            const tagNameSpan = e.target.closest('.tag-management-item').querySelector('.tag-name');
            startTagRename(tagNameSpan, tagName);
        });
    });
    
    // Delete tag functionality
    document.querySelectorAll('.delete-tag-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tagName = e.target.closest('button').dataset.tag;
            const tagCount = e.target.closest('.tag-management-item').querySelector('.tag-count').textContent;
            deleteTag(tagName, tagCount);
        });
    });
    
    // Double-click to rename
    document.querySelectorAll('.tag-name').forEach(span => {
        span.addEventListener('dblclick', (e) => {
            const tagName = e.target.dataset.original;
            startTagRename(e.target, tagName);
        });
    });
}

function startTagRename(tagNameSpan, originalTagName) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalTagName;
    input.className = 'tag-rename-input';
    input.style.cssText = `
        background: var(--input-bg);
        border: 1px solid var(--border-color);
        border-radius: 4px;
        padding: 4px 8px;
        font-size: inherit;
        color: var(--text-color);
        width: 150px;
    `;
    
    const finishRename = async () => {
        const newTagName = input.value.trim();
        if (newTagName && newTagName !== originalTagName) {
            await renameTag(originalTagName, newTagName);
        }
        tagNameSpan.textContent = tagNameSpan.dataset.original;
        tagNameSpan.style.display = 'inline';
        input.remove();
    };
    
    const cancelRename = () => {
        tagNameSpan.style.display = 'inline';
        input.remove();
    };
    
    input.addEventListener('blur', finishRename);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            finishRename();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            cancelRename();
        }
    });
    
    tagNameSpan.style.display = 'none';
    tagNameSpan.parentNode.insertBefore(input, tagNameSpan.nextSibling);
    input.focus();
    input.select();
}

async function renameTag(oldTag, newTag) {
    try {
        showLoading();
        const response = await fetch('/api/tags/rename', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldTag, newTag }),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to rename tag');
        }
        
        const result = await response.json();
        showNotification(`Tag "${oldTag}" wurde zu "${newTag}" umbenannt (${result.updatedLinks} Links aktualisiert)`, 'success');
        
        // Refresh tag management and other displays
        await showTagManagement();
        await updateTagFilter();
        await filterAndRenderLinks();
        
    } catch (error) {
        showNotification('Fehler beim Umbenennen: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

async function deleteTag(tagName, tagCountText) {
    const confirmMessage = `Möchten Sie den Tag "${tagName}" wirklich löschen?\n\nDieser Tag wird aus allen Links entfernt ${tagCountText}.`;
    
    if (!confirm(confirmMessage)) {
        return;
    }
    
    try {
        showLoading();
        const response = await fetch(`/api/tags/${encodeURIComponent(tagName)}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete tag');
        }
        
        const result = await response.json();
        showNotification(`Tag "${tagName}" wurde gelöscht (${result.updatedLinks} Links aktualisiert)`, 'success');
        
        // Refresh tag management and other displays
        await showTagManagement();
        await updateTagFilter();
        await filterAndRenderLinks();
        
    } catch (error) {
        showNotification('Fehler beim Löschen: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

// Initial render and setup
async function init() {
    await updateAllTags();
    await updateTagFilter();
    await filterAndRenderLinks();
}

init();
