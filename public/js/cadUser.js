var btnSignout = document.querySelector('.btn-signout')
var btnLogin = document.querySelector('.btn-login')
//Recebe todos os valores dos inputs
let user = {}

//O corpo de bodyUser estar em bodyCadUser.js e é chamado no dropdown.js no método drop()
function loadFormSigninOrCad(bodyUser) {
    const formUser = `
        <div class="container-form">
            <a class="iconCloseLoginOrCad" onclick="down()"><i class="fa fa-window-close"></i></a>
            ${bodyUser}
        </div>
        `
    return formUser
}

//Chamado também em dropdown.js no método drop()
//Responsável por mudar para modo login ou cadastro
function metodoCadOrLogin() {
    var alterCadLogin = document.querySelectorAll('.container-form .cad')

    var btnLoginOrCad = document.querySelector('.btn-login-or-cad')
    var aLoginOrCad = document.querySelector('.a-login-or-cad')
    if (this.mode !== "cad") {
        alterCadLogin.forEach((a) => a.querySelector('input').style.display = 'none')
        btnLoginOrCad.innerHTML = "Entrar"
        aLoginOrCad.innerHTML = "Criar Conta"
        this.mode = "cad"
    } else {
        alterCadLogin.forEach((a) => {
            a.querySelector('input').style.display = 'inline-block'
        })
        btnLoginOrCad.innerHTML = "Enviar"
        aLoginOrCad.innerHTML = "Entrar"
        this.mode = "login"
    }
}

//Limpa todos os inputs
function reset() {
    let inputCad = document.querySelectorAll(".container-form .cad")
    let inputLogin = document.querySelectorAll(".container-form .login")
    inputCad.forEach((a) => a.querySelector('input').value = "")
    inputLogin.forEach((a) => a.querySelector('input').value = "")
    this.mode !== "login" ? down() : null
}

//Signin
function signin() {
    user = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    }
    const body = JSON.stringify(user)
    fetch('/signins', {
        method: "POST",
        body: body,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) throw data.error
            let keys = JSON.stringify(data[0])
            localStorage.setItem('user', keys)
            getUser()
            reset()
        })
        .catch(err => msg(err))

}

//Responsável por faser o cadastro do usuário
function cadastro() {
    user = {
        nome: document.querySelector('#nome').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
        repitPassword: document.querySelector('#repit-password').value,
        cpf: document.querySelector('#cpf').value,
        cep: document.querySelector('#cep').value
    }
    const body = JSON.stringify(user)
    fetch('/clientes', {
        method: "POST",
        body: body,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((res) => res.text())
        .then((textContent) => {
            if (textContent) throw textContent
            reset()
            metodoCadOrLogin()
            msg()
        })
        .catch(err => msg(err))
}

//Executa o método de cadastro ou de login do cliente
function signinOrCad() {
    this.mode === 'cad' ? signin() : cadastro()
}

//Conculta se o cliente estar logado
function getUser () {
    this.user = JSON.parse(localStorage.getItem('user'))
    loadBtns(this.user)
}

//Desfaz o login
function signOut() {
    localStorage.removeItem('user')
    this.user = null
    loadBtns(this.user)
}

//Faz botão entrar ou sair aparecer 
function loadBtns(logUser) {
    if(!logUser) {
        btnLogin.style.display = 'inline-block'
        btnSignout.style.display = 'none'
    } else {
        btnLogin.style.display = 'none'
        btnSignout.style.display = 'inline-block'
    }
}

getUser()