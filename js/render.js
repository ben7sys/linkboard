// Render Module: Handles rendering of links

import { tileContainer, listBody } from './ui.js';
import { updateLink } from './api.js';

// Render links in tile view
export function renderTileLinks(links) {
    tileContainer.innerHTML = '';
    links.forEach(link => {
        const linkElement = document.createElement('div');
        linkElement.className = 'link-tile';
        linkElement.dataset.id = link.id;
        linkElement.innerHTML = `
            <div class="title-container">
                <h3 class="editable" data-field="title">${link.title}</h3>
            </div>
            <div class="url-container">
                <a href="${link.url}" target="_blank" class="editable" data-field="url">${link.url}</a>
            </div>
            <div class="tags-container">
                <div class="tags editable" data-field="tags">${renderTags(link.tags)}</div>
            </div>
            <div class="notes-container">
                <div class="notes editable" data-field="notes">${link.notes || ''}</div>
            </div>
            <div class="actions">
                <button class="deleteBtn" title="Löschen"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
        tileContainer.appendChild(linkElement);
    });
}

// Render links in list view
export function renderListLinks(links) {
    listBody.innerHTML = '';
    links.forEach(link => {
        const row = document.createElement('tr');
        row.dataset.id = link.id;
        row.innerHTML = `
            <td>
                <div class="title-container">
                    <span class="editable" data-field="title">${link.title}</span>
                </div>
            </td>
            <td>
                <div class="url-container">
                    <a href="${link.url}" target="_blank" class="editable" data-field="url">${link.url}</a>
                </div>
            </td>
            <td>
                <div class="tags-container">
                    <div class="tags editable" data-field="tags">${renderTags(link.tags)}</div>
                </div>
            </td>
            <td>
                <div class="notes-container">
                    <div class="notes editable" data-field="notes">${link.notes || ''}</div>
                </div>
            </td>
            <td>
                <button class="deleteBtn" title="Löschen"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;
        listBody.appendChild(row);
    });
}

// Render tags
export function renderTags(tags) {
    return tags.map(tag => `<span class="tag">${tag}<span class="remove-tag">×</span></span>`).join('');
}

// Render all links
export function renderLinks(links) {
    renderTileLinks(links);
    renderListLinks(links);
    addEditableListeners();
}

// Add event listeners for editable elements
function addEditableListeners() {
    document.querySelectorAll('.editable').forEach(element => {
        element.addEventListener('dblclick', (event) => {
            event.target.contentEditable = true;
            event.target.focus();
        });

        element.addEventListener('blur', async (event) => {
            event.target.contentEditable = false;
            const field = event.target.dataset.field;
            const value = event.target.innerText;
            const id = event.target.closest('[data-id]').dataset.id;
            await saveChanges(id, field, value);
        });
    });
}

// Save changes function
async function saveChanges(id, field, value) {
    try {
        const link = { [field]: value };
        await updateLink(id, link);
        console.log(`Changes saved for ID: ${id}, Field: ${field}, Value: ${value}`);
    } catch (error) {
        console.error('Error saving changes:', error);
    }
}
