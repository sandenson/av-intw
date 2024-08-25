function signup(username, password, confirm) {
    if (!(username && password && confirm)) {
        return (alert('Preencha todos os campos do formulário'));
    }
    
    if (password !== confirm) {
        document.getElementById('confirm-password').focus();
        return alert('Confirmação de senha falhou');
    }
    
    const users = JSON.parse(window.localStorage.getItem('users'));

    const user = { username, password };

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
