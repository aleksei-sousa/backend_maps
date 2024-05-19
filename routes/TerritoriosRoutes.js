const router = require('express').Router()

const TerritoriosController = require('../controllers/TerritoriosController')
const verificarToken = require('../helpers/verificarToken')

router.post('/subir', verificarToken, TerritoriosController.Subir)

router.post('/adicionar', verificarToken, TerritoriosController.Adicionar)
router.delete('/delete', verificarToken, TerritoriosController.Delete)
router.patch('/editar', verificarToken, TerritoriosController.Editar)

router.post('/concluir', verificarToken, TerritoriosController.Concluir)
router.get('/get', TerritoriosController.Get)

module.exports = router