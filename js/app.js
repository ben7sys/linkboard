// Main Application File

import { toggleViewBtn, darkModeToggleBtn, showAddLinkFormBtn, addLinkForm, popupOverlay, searchInput, tagFilter } from './ui.js';
import { fetchLinks, addLink, updateLink, deleteLink } from './api.js';
import { renderLinks } from './render.js';
import { resetForm, updateTagFilter, updateAllTags } from './form.js';

// Initialize the application
async function init() {
    await updateAllTags();
    await updateTagFilter();
    await filterAndRenderLinks();
}

// Form submission handler
addLinkForm.addEventListener('submit', async function(e) {
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
    popupOverlay.style.display = 'none';
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

// Save inline edits
async function saveInlineEdit(id) {
    // Implement saving logic here
    console.log(`Saving edits for link with ID: ${id}`);
}

// Show detailed view
function showDetailedView(id) {
    // Implement detailed view logic here
    console.log(`Showing detailed view for link with ID: ${id}`);
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

init();
