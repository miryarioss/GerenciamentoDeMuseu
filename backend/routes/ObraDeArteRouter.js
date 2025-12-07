const ObraDeArteController = require('../controllers/ObraDeArteController')
const router = require('express').Router()

router.post('/', ObraDeArteController.criarObra)
router.get('/', ObraDeArteController.listarObras)
router.get('/:id', ObraDeArteController.listarObra)
router.put('/:id', ObraDeArteController.alterarObra)
router.delete('/:id', ObraDeArteController.excluirObra)

module.exports = router
