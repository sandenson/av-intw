function getUser() {
    return JSON.parse(window.localStorage.getItem('user'));
}

function loggedIn() {
    return !!getUser();
}

function authorizeAuthentication () {
    if (loggedIn()) {
        return redirect();
    }
}

function signup(username, profilePicture, password, confirm) {
    if (!fieldsNotEmpty(username, password, confirm)) {
        return alert('Preencha todos os campos do formulário');
    }

    if (fieldsNotEmpty(profilePicture) && !isValidHttpUrl(profilePicture)) {
        return alert('URL de imagem inválida');
    }

    if (!/^.{6,}$/.test(password)) {
        return alert('A senha deve possuir pelo menos 6 caracteres');
    }

    if (!/^.{6,30}$/.test(password)) {
        return alert('A senha não pode possuir mais de 30 caracteres');
    }

    if (!/^(?=.*[a-z]).{6,30}$/.test(password)) {
        return alert('A senha deve possuir pelo menos uma letra minúscula');
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,30}$/.test(password)) {
        return alert('A senha deve possuir pelo menos uma letra maiúscula');
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,30}$/.test(password)) {
        return alert('A senha deve possuir pelo menos um número');
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s]).{6,30}$/.test(password)) {
        return alert('A senha deve possuir pelo menos um caractere especial (ex.: @, #, %, .)');
    }
    
    if (password !== confirm) {
        document.getElementById('confirm-password').focus();
        return alert('Confirmação de senha falhou');
    }
    
    const users = JSON.parse(window.localStorage.getItem('users'));

    const user = { username, profilePicture, password };

    if (users) {
        existingUser = users.find(
            ({ username: existingUsername }) => existingUsername === username
        );

        if (existingUser) {
            document.getElementById('username').focus();
            return alert('Nome de usuário já existe');
        }

        users.push(user);

        window.localStorage.setItem('users', JSON.stringify(users));
    } else {
        window.localStorage.setItem('users', JSON.stringify([user]));
    }

    window.localStorage.setItem('user', JSON.stringify(user));

    return redirect();
}

function login(username, password) {
    if (!fieldsNotEmpty(username, password, confirm)) {
        return alert('Preencha todos os campos do formulário');
    }
    
    const users = JSON.parse(window.localStorage.getItem('users'));

    if (users) {
        existingUser = users.find(
            user => user.username === username
        );

        if (existingUser) {
            if (existingUser.password === password) {
                window.localStorage.setItem('user', JSON.stringify(existingUser));
                return redirect();
            } else {
                document.getElementById('password').focus();
                return alert('Senha incorreta');
            }
        }
    }

    document.getElementById('username').focus();
    return alert('Usuário não existe');
}

function logout() {
    if (confirm('Deseja sair de sua conta?')) {
        window.localStorage.removeItem('user');
        return goTo('home');
    }
}
