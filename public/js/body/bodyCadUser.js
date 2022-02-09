this.bodyCadUser = `
<div class="form-login-or-cad">
    <div class="cad row mt-2 mb-2 w-75">
        <input class="nome form-control" placeholder="Nome" type="text" id="nome" />
    </div>
    <div class="login row mb-2 w-75">
        <input class="form-control" placeholder="E-mail" type="email" id="email" />
    </div>
    <div class="login row mb-2 w-75">
        <input class="form-control" placeholder="Senha" type="password" id="password" />
    </div>
    <div class="cad row mb-2 w-75">
        <input class="form-control" placeholder="Repetir senha" type="password" id="repit-password" />
    </div>
    <div class="cad row mb-2 w-75">
        <input class="form-control" placeholder="CPF" maxlength="11" type="text" id="cpf" />
    </div>
    <div class="cad row mb-2 w-75">
        <input class="form-control" placeholder="CEP" maxlength="8" type="text" id="cep" />
    </div>
    <div class="row mb-2 w-75">
        <button class="btn-login-or-cad btn btn-primary btn-block" onclick="signinOrCad()" id="login-or-cad"></button>
    </div>
    <div class="mb-2 w-75">
        <a class="a-login-or-cad" onclick="metodoCadOrLogin()" id="cad-button"></a>
    </div>
</div>
`