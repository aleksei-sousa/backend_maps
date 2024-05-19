const router = require('express').Router()
const UserController = require('../controllers/UsersControllers')

router.post('/login', UserController.Login)

router.post('/envio', UserController.Envio)

router.post('/createuser', UserController.createUser)

//router.get('/dados', UserController.login)
module.exports = router