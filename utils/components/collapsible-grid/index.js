function activateCollapsibles() {
    Array.from(
        document.querySelectorAll('h2.section-title:has(+.music-grid)')
    ).forEach(el => {
        el.addEventListener('click', () => {
            const musicGrid = el.nextElementSibling
            musicGrid.classList.toggle('collapsed');
            if (musicGrid.classList.contains('collapsed')) {
                musicGrid.style.maxHeight = 0;
            } else {
                musicGrid.style.maxHeight = `${musicGrid.scrollHeight}px`;
            }
        })
    })
}
