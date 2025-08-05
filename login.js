function checkPassword() {
    const password = document.getElementById('password').value;
    // Simple password - you should change this
    if (password === 'gallery123') {
        localStorage.setItem('galleryAuth', 'true');
        window.location.href = 'gallery.html';
    } else {
        alert('Incorrect password');
    }
}

// Prevent going back to gallery if not authenticated
if (!localStorage.getItem('galleryAuth')) {
    if (window.location.pathname.includes('gallery.html')) {
        window.location.href = 'index.html';
    }
}
