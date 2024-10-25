// UI Module: Handles DOM elements and event listeners

// DOM elements
export const toggleViewBtn = document.getElementById('toggleView');
export const darkModeToggleBtn = document.getElementById('darkModeToggle');
export const showAddLinkFormBtn = document.getElementById('showAddLinkForm');
export const addLinkForm = document.getElementById('addLinkForm');
export const linkForm = document.getElementById('linkForm');
export const formTitle = document.getElementById('formTitle');
export const submitBtn = document.getElementById('submitBtn');
export const tileContainer = document.getElementById('tileContainer');
export const listContainer = document.getElementById('listContainer');
export const listBody = document.getElementById('listBody');
export const detailedViewModal = document.getElementById('detailedViewModal');
export const detailedViewTitle = document.getElementById('detailedViewTitle');
export const detailedViewContent = document.getElementById('detailedViewContent');
export const editInDetailedViewBtn = document.getElementById('editInDetailedView');
export const searchInput = document.getElementById('searchInput');
export const tagFilter = document.getElementById('tagFilter'); // Export tagFilter
export const popupOverlay = document.createElement('div');
popupOverlay.id = 'popupOverlay';
document.body.appendChild(popupOverlay);

import { resetForm } from './form.js'; // Import resetForm

let isTileView = true;
let isDarkMode = true;

// Function to save dark mode preference
export function saveDarkModePreference(isDark) {
    localStorage.setItem('darkMode', isDark);
}

// Function to load dark mode preference
export function loadDarkModePreference() {
    const savedPreference = localStorage.getItem('darkMode');
    return savedPreference === null ? true : savedPreference === 'true';
}

// Function to set dark mode
export function setDarkMode(isDark) {
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
    const isVisible = addLinkForm.style.display === 'block';
    addLinkForm.style.display = isVisible ? 'none' : 'block';
    popupOverlay.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) resetForm();
});

// Hide popup when clicking on overlay
popupOverlay.addEventListener('click', () => {
    addLinkForm.style.display = 'none';
    popupOverlay.style.display = 'none';
});

// Add edit button listeners
export function addEditButtonListeners() {
    const editButtons = document.querySelectorAll('.edit-tags-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Edit button clicked');
            // Implement edit functionality here
        });
    });
}
