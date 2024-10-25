// Form Module: Handles form management

import { linkForm, formTitle, submitBtn } from './ui.js';
import { fetchLinks } from './api.js';

// Reset the form
export function resetForm() {
    linkForm.reset();
    document.getElementById('linkId').value = '';
    formTitle.textContent = 'Neuen Link hinzufügen';
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Speichern';
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
    const allTags = Array.from(new Set(links.flatMap(link => link.tags)));
    // Removed showSuggestions call
}

// Removed showSuggestions function

// Removed hideSuggestions function
