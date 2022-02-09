
var bodyDrop = document.querySelector('.drop')

function drop(produto, a) {
  bodyDrop.style.display = 'flex'
  //Limpar tudo que tem na div .drop
  bodyDrop.innerHTML = null
  //Dropdown formulário cadastro ou login de usuário
  if (a === 'entrar') {
    //Ao iniciar o drop passa "login" para this.mode
    this.mode = "login"
    //this.bodyCadUser vem de bodyCadUser.js
    bodyDrop.innerHTML += loadFormSigninOrCad(this.bodyCadUser)
    //Vem de cadUser
    metodoCadOrLogin()
  } else if (a === 'dropCheckOut') {
    bodyDrop.innerHTML += loadCheckOut(produto)
  }
}

function down() {
  //Os componentes this devem utilizados no dropdown devem ser passados para o estado inicial
  this.mode = "login"
  bodyDrop.style.display = 'none'
}


