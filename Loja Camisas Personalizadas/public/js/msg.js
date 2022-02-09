let msgErro = document.getElementById('error')
let msgSuccess = document.getElementById('success')

function msg(a){
    if(a){
      msgErro.style.display= 'flex'
      msgErro.innerHTML= a
    }else{
      msgSuccess.style.display = 'flex'  
      msgSuccess.innerHTML= 'Operação realizada com sucesso!'
    }
    setTimeout(() => {
      msgErro.style.display = 'none'
      msgErro.innerHTML = null
      msgSuccess.style.display = 'none'
      msgSuccess.innerHTML = null
    }, 5000)
}

