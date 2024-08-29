function initializeRecommendationModal() {
    initializeCloseModal();
    initializeAnonymous();
    initializeCoverPreview();
}

function toggleHiddenModal() {
    toggleHidden(document.getElementById('recommendation-modal'));
}

function initializeCloseModal() {
    document.querySelector('#recommendation-modal .close').onclick = () => toggleHiddenModal();
}

function initializeAnonymous() {
    const checkbox = document.getElementById('recommendation-anonymous');

    if (loggedIn()) {
        checkbox.checked = false;
        toggleHidden(checkbox.parentElement);
    }
}

function initializeCoverPreview() {
    const form = document.getElementById('recommendation-form');
    const input = form.querySelector('#recommendation-cover');
    const image = form.querySelector('img');

    image.onerror = ({ target }) => {
        if (!target.hidden) {
            toggleHidden(target);
        }
    }

    image.onload = ({ target }) => {
        if (target.hidden) {
            toggleHidden(target);
        }
    }
    
    input.oninput = ({ target: { value: url } }) => {
        if (isValidHttpUrl(url)) {
            image.src = url;
        }
    }
}

function recommendMusic(anonymous = true, title, artist, type, cover, genres, tags) {
    if (!(title && artist && type && cover)) {
        return alert('Os campos de título, artistas, tipo e capa são obrigatórios');
    }

    if (!isValidHttpUrl(cover)) {
        return alert('Imagem de capa inválida');
    }

    function processTags(string) {
        if (string.includes(',')) {
            return string.split(',').map(sbstr => sbstr.trim());
        }
        return string;
    }

    const recommendation = {
        user: anonymous ? null : getUser(),
        title,
        artist,
        type,
        cover,
        genres: genres ? processTags(genres) : [],
        tags: tags ? processTags(tags) : [],
    }
    
    const recommendations = JSON.parse(window.localStorage.getItem('recommendations'));

    if (recommendations) {
        recommendations.push(recommendation);
        window.localStorage.setItem('recommendations', JSON.stringify(recommendations));
    } else {
        window.localStorage.setItem('recommendations', JSON.stringify([recommendation]));
    }

    toggleHiddenModal();
    document.querySelector('#recommendation-form > form').reset();
}
