document.addEventListener('DOMContentLoaded', function() {
    const childCards = document.querySelectorAll('.child-card');
    const drawingCards = document.querySelectorAll('.drawing-card');
    const galleryTitle = document.getElementById('gallery-title');
    const showAllBtn = document.getElementById('show-all');
    
    let currentFilter = 'all';
    
    // Add click event listeners to child cards
    childCards.forEach(card => {
        card.addEventListener('click', function() {
            const selectedChild = this.dataset.child;
            
            // Remove active class from all cards
            childCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Filter drawings
            filterDrawings(selectedChild);
            
            // Update title and show button
            updateGalleryHeader(selectedChild);
        });
    });
    
    // Show all button functionality
    showAllBtn.addEventListener('click', function() {
        // Remove active class from all child cards
        childCards.forEach(c => c.classList.remove('active'));
        
        // Show all drawings
        filterDrawings('all');
        
        // Update header
        updateGalleryHeader('all');
    });
    
    function filterDrawings(artist) {
        currentFilter = artist;
        
        drawingCards.forEach(card => {
            if (artist === 'all' || card.dataset.artist === artist) {
                card.classList.remove('hidden');
                // Add staggered animation
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                }, Math.random() * 200);
            } else {
                card.classList.add('hidden');
            }
        });
    }
    
    function updateGalleryHeader(selectedChild) {
        const childNames = {
            'ryan': { name: 'Ryan', emoji: '👨‍🔬', title: 'the Future Microbiologist' },
            'felix': { name: 'Felix', emoji: '🦕', title: 'the Dinosaur Expert' },
            'all': { name: 'All', emoji: '🎨', title: 'our Amazing Artists' }
        };
        
        const child = childNames[selectedChild];
        
        if (selectedChild === 'all') {
            galleryTitle.textContent = `🎨 Drawings by all our amazing artists!`;
            showAllBtn.style.display = 'none';
        } else {
            galleryTitle.textContent = `${child.emoji} ${child.name}'s Amazing Artwork!`;
            showAllBtn.style.display = 'block';
        }
    }
    
    // Add smooth scrolling to gallery when a child is selected
    childCards.forEach(card => {
        card.addEventListener('click', function() {
            setTimeout(() => {
                document.querySelector('.gallery-section').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        });
    });
    
    // Add hover effects and interactions
    drawingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('.drawing-card img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Handle image loading errors
        img.addEventListener('error', function() {
            this.style.background = 'linear-gradient(45deg, #f7fafc, #edf2f7)';
            this.alt = 'Image not available';
        });
    });
    
    document.addEventListener('DOMContentLoaded', () => {
        // Get all necessary elements
        const childCards = document.querySelectorAll('.child-card');
        const drawingCards = document.querySelectorAll('.drawing-card');
        const showAllBtn = document.getElementById('show-all');
        const galleryTitle = document.getElementById('gallery-title');

        // Add click handlers to child cards
        childCards.forEach(card => {
            card.addEventListener('click', () => {
                const selectedArtist = card.getAttribute('data-child');
                
                // Filter drawings
                drawingCards.forEach(drawing => {
                    const artistName = drawing.getAttribute('data-artist');
                    drawing.style.display = (artistName === selectedArtist) ? 'block' : 'none';
                });

                // Update UI
                showAllBtn.style.display = 'block';
                galleryTitle.textContent = `${selectedArtist.charAt(0).toUpperCase() + selectedArtist.slice(1)}'s Drawings`;
            });
        });

        // Add click handler to "Show All" button
        showAllBtn.addEventListener('click', () => {
            drawingCards.forEach(drawing => {
                drawing.style.display = 'block';
            });
            showAllBtn.style.display = 'none';
            galleryTitle.textContent = 'Choose an artist to see their amazing drawings!';
        });
    });
});
