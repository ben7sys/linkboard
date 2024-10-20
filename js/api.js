// API Module: Handles API interactions

// Fetch all links
export async function fetchLinks() {
    const response = await fetch('http://localhost:3000/api/links');
    return await response.json();
}

// Add a new link
export async function addLink(link) {
    const response = await fetch('http://localhost:3000/api/links', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(link),
    });
    return await response.json();
}

// Update an existing link
export async function updateLink(id, link) {
    const response = await fetch(`http://localhost:3000/api/links/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(link),
    });
    return await response.json();
}

// Delete a link
export async function deleteLink(id) {
    const response = await fetch(`http://localhost:3000/api/links/${id}`, {
        method: 'DELETE',
    });
    return await response.json();
}
