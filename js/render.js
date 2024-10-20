// Render Module: Handles rendering of links

import { tileContainer, listBody } from './ui.js';
import { addEditButtonListeners } from './ui.js';

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
                <button class="edit-title-btn" title="Titel bearbeiten"><i class="fa-solid fa-pencil"></i></button>
            </div>
            <div class="url-container">
                <a href="${link.url}" target="_blank" class="editable" data-field="url">${link.url}</a>
                <button class="edit-url-btn" title="URL bearbeiten"><i class="fa-solid fa-pencil"></i></button>
            </div>
            <div class="tags-container">
                <div class="tags">${renderTags(link.tags)}</div>
                <button class="edit-tags-btn" title="Tags bearbeiten"><i class="fa-solid fa-pencil"></i></button>
            </div>
            <div class="notes-container">
                <div class="notes editable" data-field="notes">${link.notes || ''}</div>
                <button class="edit-notes-btn" title="Notizen bearbeiten"><i class="fa-solid fa-pencil"></i></button>
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

// Render tags
export function renderTags(tags) {
    return tags.map(tag => `<span class="tag">${tag}<span class="remove-tag">×</span></span>`).join('');
}

// Render all links
export function renderLinks(links) {
    renderTileLinks(links);
    renderListLinks(links);
    addEditButtonListeners();
}
