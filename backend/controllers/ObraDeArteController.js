const ObraDeArte = require('../models/ObraDeArte')

module.exports = class ObraDeArteController {

    static async criarObra(req, res) {
        try {
            const {
                titulo,
                anoCriacao,
                descricao,
                tecnicaPintura,
                dimensoes,
                material,
                localizacaoDentroMuseu,
                artistaId,
                museuId
            } = req.body

            if (!titulo) {
                res.status(422).json({ message: "Informe o título da obra!" })
                return
            }

            if (!artistaId || !museuId) {
                res.status(422).json({ message: "Informe artistaId e museuId!" })
                return
            }

            const obra = new ObraDeArte({
                titulo,
                anoCriacao,
                descricao,
                tecnicaPintura,
                dimensoes,
                material,
                localizacaoDentroMuseu,
                artistaId,
                museuId
            })

            await obra.save()
            res.status(200).json({ message: "Obra cadastrada com sucesso!" })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async listarObras(req, res) {
        try {
            const obras = await ObraDeArte.find()
                .populate("artistaId")
                .populate("museuId")
                .sort({ titulo: 1 })

            res.status(200).json(obras)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async listarObra(req, res) {
        try {
            const { id } = req.params
            const obra = await ObraDeArte.findById(id)
                .populate("artistaId")
                .populate("museuId")

            res.status(200).json(obra)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async alterarObra(req, res) {
        try {
            const { id } = req.params
            const dados = req.body

            const obraAlterada = await ObraDeArte.findByIdAndUpdate(id, dados, { new: true })

            if (!obraAlterada) {
                res.status(422).json({ message: "Obra não encontrada!" })
                return
            }

            res.status(200).json({ message: "Obra atualizada com sucesso!" })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async excluirObra(req, res) {
        try {
            const { id } = req.params
            await ObraDeArte.findByIdAndDelete(id)
            res.status(200).json({ message: "Obra excluída!" })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
