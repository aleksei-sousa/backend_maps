const jwt = require('jsonwebtoken')
const getToken = require('./getToken')

const checkToken = ( req, res, next) => {

        //se tiver vazio já desautoriza
    if(!req.headers.authorization){
        return res.status(401).json({message: "não autorizado"})
    }
        //função para pegar o token
    const token = getToken(req)
    if (!token){
        return res.status(401).json({message: "não autorizado"})
    }
    //res.status(200).json({message: token})
    // const verify = jwt.verify((token), "nossosecret")
    // console.log(verify)
    try{
        const verify = jwt.verify(token, "nossosecret")
        console.log(verify)
        req.user = verify
        next()
    } catch (err) {
        return res.status(400).json({message: "Token inválido"})
    }

}

module.exports = checkToken