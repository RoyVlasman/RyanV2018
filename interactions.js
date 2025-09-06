document.addEventListener('DOMContentLoaded', () => {
  const loadInteractions = () => {
    return JSON.parse(localStorage.getItem('artInteractions')) || {};
  };

  const saveInteractions = (interactions) => {
    localStorage.setItem('artInteractions', JSON.stringify(interactions));
  };

  const interactions = loadInteractions();

  // Initialize all cards with stored data
  document.querySelectorAll('.drawing-card').forEach(card => {
    const cardId = card.querySelector('img').src;
    const likeBtn = card.querySelector('.like-btn');
    const favoriteBtn = card.querySelector('.favorite-btn');
    const likeCount = card.querySelector('.like-count');

    if (interactions[cardId]) {
      likeCount.textContent = interactions[cardId].likes || 0;
      if (interactions[cardId].favorite) {
        favoriteBtn.classList.add('active');
      }
    }

    likeBtn.addEventListener('click', () => {
      if (!interactions[cardId]) {
        interactions[cardId] = { likes: 0 };
      }
      interactions[cardId].likes = (interactions[cardId].likes || 0) + 1;
      likeCount.textContent = interactions[cardId].likes;
      likeBtn.classList.add('active');
      saveInteractions(interactions);
    });

    favoriteBtn.addEventListener('click', () => {
      if (!interactions[cardId]) {
        interactions[cardId] = {};
      }
      interactions[cardId].favorite = !interactions[cardId].favorite;
      favoriteBtn.classList.toggle('active');
      saveInteractions(interactions);
    });
  });

  // Sorting functionality
  const gallery = document.querySelector('#gallery');
  const sortButtons = document.querySelectorAll('.sort-btn');

  const sortCards = (criteria) => {
    const cards = Array.from(document.querySelectorAll('.drawing-card'));

    const getSortValue = (card) => {
      switch (criteria) {
        case 'date':
          return new Date(card.dataset.date);
        case 'likes':
          const cardId = card.querySelector('img').src;
          return interactions[cardId]?.likes || 0;
        case 'favorites':
          const imgSrc = card.querySelector('img').src;
          return interactions[imgSrc]?.favorite ? 1 : 0;
        default:
          return 0;
      }
    };

    cards.sort((a, b) => {
      const valueA = getSortValue(a);
      const valueB = getSortValue(b);

      if (criteria === 'date') {
        return valueB - valueA; // Newest first
      }
      return valueB - valueA; // Most likes/favorites first
    });

    // Clear and reappend sorted cards
    gallery.innerHTML = '';
    cards.forEach(card => gallery.appendChild(card));
  };

  // Add click handlers for sort buttons
  sortButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const criteria = e.target.dataset.sort;
      sortCards(criteria);

      // Update active button state
      sortButtons.forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
    });
  });
});
