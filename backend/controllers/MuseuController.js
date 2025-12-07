const Museu = require('../models/Museu')

module.exports = class MuseuController {

    static async criarMuseu(req, res) {
        try {
            const {
                nome,
                localizacao,
                anoFundacao,
                descricao,
                tipo,
                site,
                telefone,
                email,
                capacidadeVisitantes
            } = req.body

            if (!nome) {
                res.status(422).json({ message: "Informe o nome do museu!" })
                return
            }

            const museu = new Museu({
                nome,
                localizacao,
                anoFundacao,
                descricao,
                tipo,
                site,
                telefone,
                email,
                capacidadeVisitantes
            })

            await museu.save()
            res.status(200).json({ message: "Museu cadastrado com sucesso!" })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async listarMuseus(req, res) {
        try {
            const museus = await Museu.find().sort({ nome: 1 })
            res.status(200).json(museus)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async listarMuseu(req, res) {
        try {
            const { id } = req.params
            const museu = await Museu.findById(id)
            res.status(200).json(museu)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async alterarMuseu(req, res) {
        try {
            const { id } = req.params
            const dados = req.body

            const museuAlterado = await Museu.findByIdAndUpdate(id, dados, { new: true })

            if (!museuAlterado) {
                res.status(422).json({ message: "Museu não encontrado!" })
                return
            }

            res.status(200).json({ message: "Museu atualizado com sucesso!" })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async excluirMuseu(req, res) {
        try {
            const { id } = req.params
            await Museu.findByIdAndDelete(id)
            res.status(200).json({ message: "Museu excluído!" })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
