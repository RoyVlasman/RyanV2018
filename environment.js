document.addEventListener('DOMContentLoaded', () => {
    const hostname = window.location.hostname;
    const indicator = document.querySelector('.env-indicator');
    
    if (hostname.includes('github.io')) {
        // Main site
        document.body.setAttribute('data-env', 'production');
        indicator.textContent = 'Production';
    } else {
        // Development site
        document.body.setAttribute('data-env', 'development');
        indicator.textContent = 'Development';
    }
});
