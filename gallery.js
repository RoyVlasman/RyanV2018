async function loadGallery() {
    try {
        // Load interactions first
        const interactions = loadInteractions();
        
        // Then load photos
        const response = await fetch('photos.json');
        const data = await response.json();
        const gallery = document.getElementById('gallery');
        
        // Clear existing gallery
        gallery.innerHTML = '';
        
        // Create cards for each photo
        data.photos.forEach(photo => {
            const card = createPhotoCard(photo, interactions[photo.filename] || {});
            gallery.appendChild(card);
        });
        
        // Initialize interaction handlers
        initializeInteractions();
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

// Load saved interactions from localStorage
function loadInteractions() {
    return JSON.parse(localStorage.getItem('artInteractions')) || {};
}

function createPhotoCard(photo, interactions = {}) {
    const card = document.createElement('div');
    card.className = 'drawing-card';
    card.dataset.artist = photo.artist;
    card.dataset.date = photo.date;
    
    const likes = interactions.likes || 0;
    const isFavorite = interactions.favorite || false;
    
    card.innerHTML = `
        <img src="images/${photo.artist === 'ryan' ? 'Ryan' : 'Felix'}/${photo.filename}" 
             alt="${photo.title}" loading="lazy">
        <div class="drawing-info">
            <h4>${photo.title}</h4>
            <span class="artist-tag">${photo.emoji} ${photo.artist === 'ryan' ? 'Ryan' : 'Felix'}</span>
            <span class="date-stamp">${formatDate(photo.date)}</span>
            <div class="interaction-buttons">
                <button class="like-btn" data-count="${likes}">
                    <span class="heart">❤️</span>
                    <span class="like-count">${likes}</span>
                </button>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}">⭐</button>
            </div>
        </div>
    `;
    
    return card;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
});