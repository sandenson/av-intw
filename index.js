function populateHeader() {
    if (loggedIn()) {
        const user = getUser();

        const userInfoDiv = document.getElementById('user-info-div-header');
        const authDiv = document.getElementById('auth-div-header');

        userInfoDiv.querySelector('div#user-info > span#username').textContent = user.username;
        userInfoDiv.querySelector('div#user-info > img#pfp').src = user.profilePicture;
        
        toggleHidden(authDiv, userInfoDiv);
    }
}

function populateRecommendedCta() {
    if (loggedIn()) {
        toggleHidden(
            document.getElementById('recommendation-cta-logged-out'),
            document.getElementById('recommendation-cta-logged-in')
        );
    }
}
