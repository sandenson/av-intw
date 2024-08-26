function populateHeader() {
    console.log('jorge')
    if (loggedIn()) {
        const user = getUser();

        const userInfoDiv = document.getElementById('user-info-div-header');
        const authDiv = document.getElementById('auth-div-header');

        userInfoDiv.querySelector('div#user-info > span#username').textContent = user.username;
        userInfoDiv.querySelector('div#user-info > img#pfp').src = user.profilePicture;
        
        authDiv.style.display = 'none';
        authDiv.hidden = true;
        userInfoDiv.style.display = null;
        userInfoDiv.hidden = false;
    }
}
