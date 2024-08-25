function goTo(page) {
    switch (page) {
        case 'home':
            window.location.href = window.location.pathname = '';
            break;
        case 'signup':
            window.location.href = window.location.pathname = '/auth/signup';
            break;
        case 'login':
            window.location.href = window.location.pathname = '/auth/login';
            break;
        default:
            window.location.href = window.location.pathname = '';
            break;
    }
}