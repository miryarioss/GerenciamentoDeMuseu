const MuseuController = require('../controllers/MuseuController')
const router = require('express').Router()

router.post('/', MuseuController.criarMuseu)
router.get('/', MuseuController.listarMuseus)
router.get('/:id', MuseuController.listarMuseu)
router.put('/:id', MuseuController.alterarMuseu)
router.delete('/:id', MuseuController.excluirMuseu)

module.exports = router
