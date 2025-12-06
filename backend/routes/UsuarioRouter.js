const UsuarioController = require('../controllers/UsuarioController')

const router = require('express').Router()

router.post('/',UsuarioController.criarUsuario)
router.get('/',UsuarioController.listarUsuarios)    
router.delete('/:id',UsuarioController.excluirUsuario)    
router.put('/:id',UsuarioController.alterarUsuario)
router.get('/:id',UsuarioController.listarUsuario)
router.post('/login',UsuarioController.logar)

module.exports = router