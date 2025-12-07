const mongoose = require('../db/conn')
const { Schema } = mongoose

const Artista = mongoose.model(
    'Artista',
    new Schema({
        nome: { type: String, required: true },
        nacionalidade: { type: String },
        dataNascimento: { type: Date },
        dataFalecimento: { type: Date },
        biografia: { type: String },
        estiloArtistico: { type: String },
        premios: [{ type: String }],
        website: { type: String },
        periodoArtistico: { type: String }
    }, { timestamps: true })
)

module.exports = Artista
