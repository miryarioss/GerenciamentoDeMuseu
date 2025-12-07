const mongoose = require('../db/conn')
const { Schema } = mongoose

const Usuario = mongoose.model(
    'Usuario',
    new Schema({
        nome: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        imagem: { type: String },
        telefone: { type: String }
    }, { timestamps: true })
)

module.exports = Usuario