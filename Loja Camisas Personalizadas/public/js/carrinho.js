const countProdutos = document.querySelector('.btn-car')
const elementosNoCarrinho = document.querySelector('.dropCarrinho')
const headerCloseModal = document.querySelector('.iconClose')

let produtos = !getCarrinho()
    ? [] : [getCarrinho()]

//Adiciona um array de ids no localStorage
function addCarrinho() {
    try {
        //Só adiciona ao localStorage se a estampa for selecionada, this.urlCor, this.urlEstampa e this.idEstampa estão vindo de home.js dos métodos selectEstampa e selectCor
        if (!this.estampa) throw 'Favor é preciso selecionar a estampa!'
        produtos.push(this.produto)
        //Transforma array dentro de array em um único array
        array = produtos.reduce((list, sub) => list.concat(sub), [])

        let keys = JSON.stringify(array)
        localStorage.setItem('produto', keys)
        carregarquantidade()
    } catch (error) {
        msg(error)
    }
}

//Consulta no localStorage
function getCarrinho() {
    let items = localStorage.getItem('produto')
    return JSON.parse(items)
}

//Retorna a contagem dos produtos adicionados ao carrinho
function carregarquantidade() {
    countCarrinho = getCarrinho()
    carregarListaCarrinho()
    countProdutos.innerHTML = countCarrinho ? `Carrinho (${countCarrinho.length})` : "Carrinho (0)"
}

//Limpar item do localStorage
function limpar() {
    localStorage.removeItem('produto')
    countProdutos.innerHTML = "Carrinho (0)"
}

//Limpa um item por vez
function limparPorItem(item, quant) {
    let arrayPorIds = getCarrinho() ? getCarrinho() : []
    quant = !quant ? 1 : quant
    arrayPorIds.splice(item, quant)

    let keys = JSON.stringify(arrayPorIds)
    !arrayPorIds[0] ? limpar() : localStorage.setItem('produto', keys)
    //Recarrega a página toda vez que o carrinho for totalmente limpo
    !getCarrinho() ? location.reload() : null
    carregarquantidade()
}

//Ativa lista de produto no carrinho carrinho
function dropCar() {
    elementosNoCarrinho
        .style.display = "flex"
    headerCloseModal
        .style.display = "flex"
}

//Desativa lista de produto no carrinho carrinho
function downCar() {
    elementosNoCarrinho
        .style.display = "none"
    headerCloseModal
        .style.display = "none"
}

//Trata elementos para ser renderizados na lista do carrinho
function /*newCarregarListaCarrinho*/tratarForEstampa() {
    const produtosNoCarrinho = []
    if(getCarrinho()) {
        getCarrinho().map((a) => produtosNoCarrinho.push(a))
    }
    return !getCarrinho() ? [] : produtosNoCarrinho
}

//Responsável por carregar lista carrinho
function carregarListaCarrinho() {
    elementosNoCarrinho.innerHTML = null
    if (getCarrinho()) {
        tratarForEstampa().map((a, i) => {
            elementosNoCarrinho.innerHTML += `
                <div class="contentCarrinho">
                    <div class="title-carrinho-drop">${a.cor} 
                        <div class="quantCarrinho">${a.quant}</div>
                        <div class="valorCarrinho">${a.valor}</div>
                        <div onclick="limparPorItem(${i})" class="remove-item-carrinho"><i class="fa fa-minus" ></i></div>
                    </div>
                    <ul onclick="checkCar(
                    produto = {
                        idProduto: ${a.idProduto},
                        idEstampa: ${a.idEstampa},
                        quant: ${a.quant},
                        position: ${i},
                        urlCor: '${a.urlCor}',
                        cor: '${a.cor}',
                        urlEstampa: '${a.urlEstampa}',
                        descricaoEstampa: '${a.descricaoEstampa}',
                        descricaoCamisa: '${a.descricaoCamisa}',
                        valor: ${a.valor}                       
                    }
                )">
                       <img src="${a.urlCor}" >
                       <img class="drop-car-img-estampa" src="${a.urlEstampa}" >
                    </ul>
                </div>
            `
        })
    } else {
        elementosNoCarrinho.innerHTML += `<div class="carrinhoVazio">Desculpe carrinho vazio</div>`
    }
}

function checkCar(produto) {
    this.produto = produto
    this.typeCheck = "carrinho"
    var mode = null
    this.user ? mode = "dropCheckOut" : mode = "entrar"
    drop(produto, mode)
}

carregarquantidade()






