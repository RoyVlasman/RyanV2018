document.addEventListener('DOMContentLoaded', () => {
    const childCards = document.querySelectorAll('.child-card');
    const drawingCards = document.querySelectorAll('.drawing-card');
    const showAllBtn = document.getElementById('show-all');
    const galleryTitle = document.getElementById('gallery-title');

    // Function to filter gallery
    function filterGallery(selectedArtist) {
        drawingCards.forEach(card => {
            if (card.getAttribute('data-artist') === selectedArtist) {
                card.removeAttribute('hidden');
            } else {
                card.setAttribute('hidden', '');
            }
        });
    }

    // Add click handlers to child cards
    childCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const artist = card.getAttribute('data-child');
            
            // Update active states
            childCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            // Filter gallery
            filterGallery(artist);
            
            // Update UI
            showAllBtn.style.display = 'block';
            galleryTitle.textContent = `${artist.charAt(0).toUpperCase() + artist.slice(1)}'s Drawings`;
        });
    });

    // Show all button handler
    showAllBtn.addEventListener('click', () => {
        drawingCards.forEach(card => card.removeAttribute('hidden'));
        childCards.forEach(card => card.classList.remove('active'));
        showAllBtn.style.display = 'none';
        galleryTitle.textContent = 'Choose an artist to see their amazing drawings!';
    });
});