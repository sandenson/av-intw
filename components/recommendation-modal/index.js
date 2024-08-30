function initializeRecommendationModal() {
    initializeCloseModal();
    initializeAnonymous();
    initializeCoverPreview();
    initializeRecommendations();
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

function createRecommendationCard(recommendation) {
    const { user, title, artist, type, cover, genres, tags } = recommendation;

    const card = document.createElement('div');
    card.className = 'music-entry-card';

    const titleEl = document.createElement('h3');
    card.appendChild(titleEl);
    titleEl.className = 'music-title';
    titleEl.textContent = title;

    const artistEl = document.createElement('h4');
    card.appendChild(artistEl);
    artistEl.className = 'music-artist';
    artistEl.textContent = artist;

    const typeEl = document.createElement('span');
    card.appendChild(typeEl);
    typeEl.className = 'music-type';
    typeEl.textContent = type;

    const coverEl = document.createElement('img');
    card.appendChild(coverEl);
    coverEl.alt = `${title.replace(/[^A-z0-9]+/gm, '-').replace(/-$/, '').toLowerCase()}-cover`;
    coverEl.src = cover;

    const userEl = document.createElement('div');
    card.appendChild(userEl);
    userEl.className = 'tags-section';
    userEl.appendChild(document.createElement('p'));
    userEl.firstElementChild.textContent = 'Recomendado por';

    const userTagsEl = document.createElement('div');
    userEl.appendChild(userTagsEl);
    userTagsEl.className = 'tags';

    const userTagEl = document.createElement('span');
    userTagsEl.appendChild(userTagEl);
    userTagEl.className = 'tag';
    const userPfpHtml = user?.profilePicture ?  `<img src="${user.profilePicture}" alt="recommender-pfp"> ` : '';
    userTagEl.innerHTML = `${userPfpHtml}${user?.username || 'Anônim@'}`;

    const genresEl = document.createElement('div');
    card.appendChild(genresEl);
    genresEl.className = 'tags-section';
    genresEl.appendChild(document.createElement('p'));
    genresEl.firstElementChild.textContent = 'Gêneros';

    const genreTagsEl = document.createElement('div');
    genresEl.appendChild(genreTagsEl);
    genreTagsEl.className = 'tags';
    genreTagsEl.append(...genres.map(genre => {
        const genreTagEl = document.createElement('span');
        genreTagEl.className = 'tag';
        genreTagEl.textContent = genre;
        return genreTagEl;
    }));

    const tagsEl = document.createElement('div');
    card.appendChild(tagsEl);
    tagsEl.className = 'tags-section';
    tagsEl.appendChild(document.createElement('p'));
    tagsEl.firstElementChild.textContent = 'Tags';

    const musicTagsEl = document.createElement('div');
    tagsEl.appendChild(musicTagsEl);
    musicTagsEl.className = 'tags';
    musicTagsEl.append(...tags.map(tag => {
        const tagEl = document.createElement('span');
        tagEl.className = 'tag';
        tagEl.textContent = tag;
        return tagEl;
    }));

    document.querySelector('#music-recommendations > .music-grid').appendChild(card);
}

function initializeRecommendations() {
    const recommendations = JSON.parse(window.localStorage.getItem('recommendations'));

    if (recommendations?.length > 0) {
        recommendations.forEach(createRecommendationCard);
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
        return [string];
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

    createRecommendationCard(recommendation);
    toggleHiddenModal();
    document.querySelector('#recommendation-form > form').reset();
}
