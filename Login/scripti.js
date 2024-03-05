const users = [
    { username: 'Charles', password: '1305', redirectPage: '../Charles/Charlesi.html' },
    { username: 'Wantony', password: '0987', redirectPage: '../Wantony/Wantonyi.html' },
];

function authenticateUser() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    const user = users.find(u => u.username === usernameInput && u.password === passwordInput);

    if (user) {
        alert('Login bem-sucedido! Aguarde alguns segundos para o redirecionamento...');
        setTimeout(() => {
            window.location.href = user.redirectPage;
        }, 1000);
        setTimeout(() => {
            window.location.href = '../Outra/outrai.html';
        }, 5000);
    } else {
        alert('Usuário ou senha incorretos. Tente novamente.');
    }
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const showPasswordCheckbox = document.getElementById('showPasswordCheckbox');

    passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
}
