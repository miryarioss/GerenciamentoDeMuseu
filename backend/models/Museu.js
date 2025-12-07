const mongoose = require('../db/conn')
const { Schema } = mongoose

const Museu = mongoose.model(
    'Museu',
    new Schema({
        nome: { type: String, required: true },
        localizacao: { type: String },
        anoFundacao: { type: Number },
        descricao: { type: String },
        tipo: { type: String },
        site: { type: String },
        telefone: { type: String },
        email: { type: String },
        capacidadeVisitantes: { type: Number }
    }, { timestamps: true })
)

module.exports = Museu
