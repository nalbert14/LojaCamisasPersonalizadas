
module.exports = validate => {
    //existe gera um erro
    function existsOrError(value, msg) {
        if (!value) throw msg//se não existir
        if (Array.isArray(value) && value.length === 0) throw msg//Se retornar um array vasio
        if (typeof value === 'string' && !value.trim()) throw msg//se a string for vasia
    }

    //se não existir está ok caso exista gera um erro 
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }

    //se for igual não dar erro
    function equalsOrError(valueA, valueB, msg) {
        if (valueA !== valueB) throw msg
    }
    return { existsOrError, notExistsOrError, equalsOrError }
}