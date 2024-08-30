function toggleHidden(...elements) {
    elements.forEach(el => {
        el.hidden = !el.hidden;
        el.classList.toggle('hidden');
    });
}