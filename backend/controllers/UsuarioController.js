const Usuario = require('../models/Usuario')

module.exports = class UsuarioController {
    static async alterarUsuario(req, res) {
        try {
            const { id } = req.params
            const { nome, email, password, telefone } = req.body

            const usuarioalterado = await Usuario.findByIdAndUpdate(id,
                {
                    nome: nome,
                    email: email,
                    password: password,
                    telefone: telefone
                },
                { new: true })

            if (!usuarioalterado) {
                res.status(422).json({ message: "Usuário não existe!", usuarioalterado })
                return
            }

            res.status(200).json({ message: "Usuário alterado com sucesso!" })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async excluirUsuario(req, res) {
        try {
            const { id } = req.params
            const usuario = await Usuario.findByIdAndDelete(id)
            res.status(200).json({ message: "Resgistro excluído!" })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async listarUsuarios(req, res) {
        try {
            const usuarios = await Usuario.find().sort({ nome: 1 })

            res.status(200).json(usuarios)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async logar(req, res) {
        try {
            const { email, password } = req.body

            if (!email) {
                res.status(422).json({ message: "Informe o e-mail!" })
                return
            }

            if (!password) {
                res.status(422).json({ message: "Informe a senha!" })
                return
            }

            const usuario = await Usuario.findOne({ email: email })

            if (!usuario) {
                res.status(422).json({ message: "Usuário não encontrado!" })
                return
            }

            if (usuario.password != password) {
                res.status(422).json({ message: "Senha não confere!" })
                return
            }

            res.status(200).json(usuario)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async listarUsuario(req, res) {
        try {
            const { id } = req.params
            const usuario = await Usuario.findById(id)

            res.status(200).json(usuario)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async criarUsuario(req, res) {
        const { nome, email, password, confirmpassword, imagem, telefone } = req.body

        if (!nome) {
            res.status(422).json({ message: "Informe o nome do usuário!" })
            return
        }

        if (!email) {
            res.status(422).json({ message: "Informe o e-mail do usuário!" })
            return
        }

        if (!password) {
            res.status(422).json({ message: "Informe a senha do usuário!" })
            return
        }

        if (password !== confirmpassword) {
            res.status(422).json({ message: "Confirmação de senha não confere!" })
            return
        }

        const usuario = new Usuario({
            nome: nome,
            email: email,
            password: password,
            imagem: imagem,
            telefone: telefone
        })

        try {
            await usuario.save()
            res.status(200).json({ message: "Usuário inserido com sucesso" })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
