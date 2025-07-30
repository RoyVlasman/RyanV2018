document.addEventListener('DOMContentLoaded', () => {
    // Get all required elements
    const childCards = document.querySelectorAll('.child-card');
    const drawingCards = document.querySelectorAll('.drawing-card');
    const showAllBtn = document.getElementById('show-all');
    const galleryTitle = document.getElementById('gallery-title');

    // Function to filter drawings
    function filterDrawings(artist) {
        drawingCards.forEach(drawing => {
            if (artist === 'all') {
                drawing.style.display = 'block';
            } else {
                drawing.style.display = drawing.getAttribute('data-artist') === artist ? 'block' : 'none';
            }
        });
    }

    // Add click handlers to child cards
    childCards.forEach(card => {
        card.addEventListener('click', () => {
            const selectedArtist = card.getAttribute('data-child');
            
            // Update active states
            childCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            // Filter drawings
            filterDrawings(selectedArtist);
            
            // Update UI
            showAllBtn.style.display = 'block';
            galleryTitle.textContent = `${selectedArtist.charAt(0).toUpperCase() + selectedArtist.slice(1)}'s Drawings`;
        });
    });

    // Show all button handler
    showAllBtn.addEventListener('click', () => {
        filterDrawings('all');
        childCards.forEach(card => card.classList.remove('active'));
        galleryTitle.textContent = 'Choose an artist to see their amazing drawings!';
        showAllBtn.style.display = 'none';
    });
});