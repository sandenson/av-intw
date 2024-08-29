function initializeRecommendationModal() {
    initializeAnonymous();
    initializeCoverPreview();
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
