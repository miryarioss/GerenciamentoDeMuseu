const Artista = require('../models/Artista')

module.exports = class ArtistaController {

    static async criarArtista(req, res) {
        try {
            const {
                nome,
                nacionalidade,
                dataNascimento,
                dataFalecimento,
                biografia,
                estiloArtistico,
                premios,
                website,
                periodoArtistico
            } = req.body

            if (!nome) {
                res.status(422).json({ message: "Informe o nome do artista!" })
                return
            }

            const artista = new Artista({
                nome,
                nacionalidade,
                dataNascimento,
                dataFalecimento,
                biografia,
                estiloArtistico,
                premios,
                website,
                periodoArtistico
            })

            await artista.save()
            res.status(200).json({ message: "Artista cadastrado com sucesso!" })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async listarArtistas(req, res) {
        try {
            const artistas = await Artista.find().sort({ nome: 1 })
            res.status(200).json(artistas)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async listarArtista(req, res) {
        try {
            const { id } = req.params
            const artista = await Artista.findById(id)
            res.status(200).json(artista)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async alterarArtista(req, res) {
        try {
            const { id } = req.params
            const dados = req.body

            const artistaAlterado = await Artista.findByIdAndUpdate(id, dados, { new: true })

            if (!artistaAlterado) {
                res.status(422).json({ message: "Artista não encontrado!" })
                return
            }

            res.status(200).json({ message: "Artista atualizado com sucesso!" })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async excluirArtista(req, res) {
        try {
            const { id } = req.params
            await Artista.findByIdAndDelete(id)
            res.status(200).json({ message: "Artista excluído!" })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
