function finalizar(a) {
  let msgErro = document.getElementById('error')
  let msgSuccess = document.getElementById('success')
  let user = {}
  user ={
    nome: document.querySelector('#nome').value,
    numCartao: document.querySelector('#numero').value,
    valCartao: document.querySelector('#validade').value,
    cvcCartao: document.querySelector('#cvc').value
  }
  if (a) {
    msgErro.style.display = 'flex'
    msgErro.innerHTML = a
  } else {
    msgSuccess.style.display = 'flex'
    msgSuccess.innerHTML = 'Operação realizada com sucesso!'
  }
  setTimeout(() => {
    msgErro.style.display = 'none'
    msgErro.innerHTML = null
    msgSuccess.style.display = 'none'
    msgSuccess.innerHTML = null
  }, 5000)
}
// function chekOut (a) {
// let erroLogin = document.querySelector('.container-form .cad')
//   erroLogin.style.display = "flex"
//   erroLogin.innerHTML = null
//   if (a === 'erroLogin') {
//     erroLogin.innerHTML += ``
  
//   }
// }