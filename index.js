document.addEventListener('DOMContentLoaded', () => {
    // Environment detection
    const hostname = window.location.hostname;
    const branch = window.location.pathname.includes('-dev') ? 'dev' : 'main';
    const envIndicator = document.createElement('div');
    envIndicator.className = 'env-indicator';
    envIndicator.textContent = branch === 'dev' ? 'Development' : '';
    document.querySelector('header').appendChild(envIndicator);

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

    // Get modal elements
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentImageIndex = 0;
    const images = document.querySelectorAll('.drawing-card img');

    function showImage(index) {
        currentImageIndex = index;
        modalImg.src = images[index].src;
        
        // Update button visibility
        prevBtn.style.display = index === 0 ? 'none' : 'block';
        nextBtn.style.display = index === images.length - 1 ? 'none' : 'block';
    }

    images.forEach((img, index) => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            showImage(index);
        });
    });

    prevBtn.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            showImage(currentImageIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentImageIndex < images.length - 1) {
            showImage(currentImageIndex + 1);
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
                showImage(currentImageIndex - 1);
            }
            if (e.key === 'ArrowRight' && currentImageIndex < images.length - 1) {
                showImage(currentImageIndex + 1);
            }
            if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });

    // Close modal when clicking X
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {});