const mongoose = require('../db/conn')
const { Schema } = mongoose

const ObraDeArte = mongoose.model(
    'ObraDeArte',
    new Schema({
        titulo: { type: String, required: true },
        anoCriacao: { type: Number },
        descricao: { type: String },
        tecnicaPintura: { type: String },
        dimensoes: { type: String },
        material: { type: String },
        localizacaoDentroMuseu: { type: String },

        artistaId: { type: Schema.Types.ObjectId, ref: 'Artista', required: true },
        museuId: { type: Schema.Types.ObjectId, ref: 'Museu', required: true }
    }, { timestamps: true })
)

module.exports = ObraDeArte
