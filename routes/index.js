function goTo(page) {
    switch (page) {
        case 'home':
            window.location.pathname = '';
            break;
        case 'signup':
            if (!loggedIn()) {
                window.location.pathname = '/auth/signup';
            }
            break;
        case 'login':
            if (!loggedIn()) {
                window.location.pathname = '/auth/login';
            }
            break;
        default:
            window.location.pathname = '';
            break;
    }
}

function redirect() {
    return goTo(new URLSearchParams(window.location.search).get('redirect') || 'home');
}