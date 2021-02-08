// Controlador para o modelo Tarefa

var Team = require('../models/team')

// Devolve a lista de Publicações
module.exports.listar = () => {
    return Team
        .find()
        .select('_id team pitch1 pitch2 techPitch businessReport techReport')
        .exec()
}

module.exports.consultar = id => {
    return Team
        .findOne({_id: id})
        .exec()
}

module.exports.membroEquipe = (id, idMember) => {
    return Team
        .find({_id: id})
        .select('')
        .exec()
}

module.exports.inserirEquipe = e => {
    return Team
        .insert(e)
        .exec()
}

module.exports.deleteEquipe = id => {
    return Team
        .deleteOne({_id: id})
        .exec()
}