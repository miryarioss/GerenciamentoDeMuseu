const ArtistaController = require('../controllers/ArtistaController')
const router = require('express').Router()

router.post('/', ArtistaController.criarArtista)
router.get('/', ArtistaController.listarArtistas)
router.get('/:id', ArtistaController.listarArtista)
router.put('/:id', ArtistaController.alterarArtista)
router.delete('/:id', ArtistaController.excluirArtista)

module.exports = router
