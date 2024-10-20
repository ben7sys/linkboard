// Form and Tag Module: Handles form and tag management

import { linkForm, formTitle, submitBtn, tagList, tagInput, tagSuggestions } from './ui.js';
import { fetchLinks } from './api.js';

let allTags = []; // Declare allTags variable

// Reset the form
export function resetForm() {
    linkForm.reset();
    document.getElementById('linkId').value = '';
    formTitle.textContent = 'Neuen Link hinzufügen';
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Speichern';
    tagList.innerHTML = '';
}

// Add a tag to the list
export function addTag(tag) {
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

// Update the tag filter options
export async function updateTagFilter() {
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

// Update all tags for auto-suggestion
export async function updateAllTags() {
    const links = await fetchLinks();
    allTags = Array.from(new Set(links.flatMap(link => link.tags)));
    showSuggestions(allTags); // Ensure suggestions are shown after updating
}

// Show tag suggestions
export function showSuggestions(suggestions) {
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

// Hide tag suggestions
export function hideSuggestions() {
    tagSuggestions.style.display = 'none';
}
