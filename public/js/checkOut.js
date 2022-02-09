
//Passa o produto para o drop de checkout
function loadCheckOut(produto) {
    //Faz a busca do CEP
    loadCep(this.user.cep)
    const formCheckOut = `
    <div class="containerCheckout">
        <a class="iconCloseLoginOrCad" onclick="down()"><i class="fa fa-window-close"></i></a>
        <div class="contentCheckOut">
            <div class="parte-checkout">
                <div class="camisa-checkout">
                    <img class="img-camisa-checkout" src="${produto.urlCor}" >
                    <img class="img-estampa-checkout" src="${produto.urlEstampa}" >
                </div>
                <div class="input-quant-valor">
                    <span>Quantidade </span>
                    <input class="form-control mb-2 ml-2 w-50" onkeyup="soma()" value="${produto.quant}" type="text" id="quantidade">
                    <input class="form-control" type="hidden" id="valor" value="${produto.valor}">
                    <div class="valor-checkout" type="text" id="valor-total">${produto.valor}</div>
                </div>
            </div>
            <div class="parte-checkout">
                <div class="endereco-entrega">
                    <h1>Endereço de entrega</h1>
                    <div>
                        <span class="localidade"></span> - <span class="uf"></span>
                    </div>
                    <div>
                        <span class="logradouro"></span> - <span class="bairro"></span>
                    </div>
                </div>
            </div>
            <div class="parte-checkout">
                <div class="cartao-credito">
                    Nome: <input class="form-control mb-2" id="nome">
                    Número do Cartão: <input class="form-control mb-2" maxlength="16" id="numero" >
                    <div class="row">
                        <div class="col-6">
                            Data de Validade: <input class="form-control mb-2 w-100" maxlength="5" id="validade">
                        </div>
                        <div class="col-6">
                            CVC: <input class="form-control mb-2 w-50" maxlength="3" id="cvc">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="btn btn-primary mt-2" onclick="finalizar()">Finalizar</button>
    </div>
    `
    return formCheckOut
}

function loadCep(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`, { method: "GET" })
        .then(data => data.json()
            .then((end) => {
                if (end.erro) throw "Cep inválido"
                document.querySelector('.localidade').innerHTML = end.localidade
                document.querySelector('.uf').innerHTML = end.uf
                document.querySelector('.logradouro').innerHTML = end.logradouro
                document.querySelector('.bairro').innerHTML = end.bairro
            }))
        .catch(err => msg(err))
}

function soma() {
    var quantidade = document.getElementById('quantidade')
    var valor = document.getElementById('valor')
    var vTotal = document.getElementById('valor-total')
    this.preco = parseInt(quantidade.value) * parseFloat(valor.value)
    quantidade.value !== "" ? vTotal.innerHTML = preco : vTotal.innerHTML = 0
}

function finalizar() {
    var card = {
        nome: document.getElementById('nome').value,
        numero: document.getElementById('numero').value,
        validade: document.getElementById('validade').value,
        cvc: document.getElementById('cvc').value
    }
    var comprar = { 
        ...this.produto, 
        ...this.user, 
        ...card, 
        valorTotal: !this.preco ?  this.produto.valor : this.preco}
        const body = JSON.stringify(comprar)
        
        fetch('/chekOuts', {
            method: "POST",
            body: body,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => res.text())
        .then((message) => {
            if (message) throw message
            msg()
            this.typeCheck==='carrinho' ? limparPorItem(this.produto.position, this.produto.quant) : null
            resetCheckout()
        })
        .catch(err => msg(err))
}

//Reseta operação de checkout
function resetCheckout() {
    document.getElementById('nome').value = ""
    document.getElementById('numero').value = ""
    document.getElementById('validade').value = ""
    document.getElementById('cvc').value = ""
    this.produto = defaultProduto()
    //limpa estampa da camisa
    document.querySelector('.content-estampa').innerHTML = "Insira a estampa aqui"
    down()
}
