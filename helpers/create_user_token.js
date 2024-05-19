const jwt = require('jsonwebtoken')

const createUserToken = async ( user, req, res) => {
    
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "nossosecret")

    //retorno para o front end
    res.status(200).json({
        message:'você está logado',
        token: token,
        user_id: user._id
    })

}
module.exports = createUserToken