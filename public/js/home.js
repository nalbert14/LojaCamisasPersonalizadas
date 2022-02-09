
let imgCamisa = document.querySelector('.camisa-img')
let imgEstampa = document.querySelector('.content-estampa')

function defaultProduto() {
  const produtos = {
    idProduto: 2,
    cor: 'Branca',
    urlCor: 'https://i.ibb.co/nfM4JGr/camisa-branca.png',
    valor: 19.99,
    quant: 1,
    descricaoCamisa: 'Camisa Branca Unisex 100%'
  }
  return produtos
}

//Se não houver id ele enviará um erro
function checkOut() {
  try {
    this.produto = !this.produto ? defaultProduto() : this.produto
    //Só adiciona ao localStorage se a estampa for selecionada
    if (!this.produto.idEstampa) throw 'Favor é preciso selecionar a estampa!'
    //Caso não haja usuário logado abrirá o formulário de login ou cadastro
    if (!this.user) return drop(null, 'entrar')
    //Este método vem de dropdown
    drop(this.produto, "dropCheckOut")
    this.typeCheck = "check"
  } catch (error) {
    msg(error)
  }
}

//Seleciona a cor da camisa
function selectCor(camisa) {
  this.produto = { ...camisa, ...this.estampa }
  this.produto.valor = 19.99
  imgCamisa.src = camisa.urlCor
}

//Seleciona a estampa
function selectEstampa(estampa) {
  this.produto = !this.produto ? defaultProduto() : this.produto
  this.estampa = { ...estampa }
  imgEstampa.innerHTML = `<img class="img-estampa" src="${this.estampa.urlEstampa}" >`
  this.produto = { ...this.produto, ...this.estampa }
  this.produto.valor = 19.99
}
