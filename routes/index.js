function goTo(page) {
    const prod = true;

    const path = prod ? '/av-intw' : '';

    switch (page) {
        case 'home':
            window.location.pathname = path;
            break;
        case 'signup':
            if (!loggedIn()) {
                window.location.pathname = `${path}/auth/signup`;
            }
            break;
        case 'login':
            if (!loggedIn()) {
                window.location.pathname = `${path}/auth/login`;
            }
            break;
        default:
            window.location.pathname = path;
            break;
    }
}

function redirect() {
    return goTo(new URLSearchParams(window.location.search).get('redirect') || 'home');
}