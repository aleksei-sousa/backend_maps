//const createUserToken = require('../helpers/create_user_token')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/Users')
const Territorio = require('../models/Territorios')
const jwt = require('jsonwebtoken')
const createUserToken = require('../helpers/create_user_token')

module.exports = class UserController {


    static async Login (req, res){

        const {name, password} = req.body

        console.log(name, password)

        if(!name){
            res.status(410).json({message: "Digite seu nome"})
            return
        }
        if(!password){
            res.status(410).json({message: "Digite sua senha"})
            return
        }

        const user = await User.findOne({name: name})

        if(!user){
             res.status(410).json({message: "Usuário ou senha são inválidos - 1"})
             return
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(410).json({message: 'Usuário ou senha são inválidos - 2'})
            return
        }


        await createUserToken(user, req, res)

    }

    static async Envio (req, res){
        
        const {name, password, numero_mapa, dados} = req.body

        console.log(name, password)

        if(!name){
            res.status(410).json({message: "Digite seu nome"})
            return
        }
        if(!password){
            res.status(410).json({message: "Digite sua senha"})
            return
        }
        if(!numero_mapa){
            res.status(410).json({message: "Qual o número do território ?"})
            return
        }
        if(!dados){
            res.status(410).json({message: "Quais os dados ?"})
            return
        }

        const user = await User.findOne({name: name})

        if(!user){
             res.status(410).json({message: "Esse nome não está cadastrado"})
             return
        }

        //checar se a senha existe: password é a senha crua do front e user.password é do usuário do bd
        const checkPassword = await bcrypt.compare(password, user.password)
        //console.log(checkPassword)

        if(!checkPassword){
            res.status(410).json({message: 'Senha errada'})
            return
        }

        const mapaExist = await Territorio.findOne({numero: numero_mapa})

        if(mapaExist){

            //const territorio = await Territorio.find().select({numero: "1"})

            try{
                const filter = { numero: numero_mapa };
                const update = { responsavel: name, dados: dados };
                console.log()
                let doc = await Territorio.findOneAndUpdate(filter, update);
                await Territorio.findOneAndUpdate(
                    filter,
                    update,
                    { new: true},
                )
                    res.status(210).json({
                        message: "Usuário atualizado"
                    })

            } catch (err) {
                res.status(500).json({ message: err})
            }

            //const newTerritorio = await mapa.save()
            // try {

            //     const territorio = await Territorio.find().select({numero: "1"})
            //     console.log(territorio)
            //     //res.status(210).json({message: exist})
            // } catch (error) {
            //     res.status(410).json({message: error})
            // }
        
        
        } else {
            const mapa = new Territorio ({
                numero: numero_mapa,
                responsavel: name,
                dados: dados
            })
            console.log(mapa)
            try {
                const newTerritorio = await mapa.save()
                res.status(210).json({message: "território adicionado"})
            } catch (error) {
                res.status(410).json({message: error})
            }

        }
    }


    static async createUser (req, res){
        const {name, password} = req.body

        //res.status(210).json({name: name, password: password})



        //verificar se já existe alguem com esse nome
        const userExist = await User.findOne({name: name})

        if(userExist){
            res.status(422).json({message: "Já existe existe esse usuário !"})
            return
        }
        
        //criando uma senha criptografada
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User ({
            name: name,
            password: passwordHash
        })
        console.log(user)

        try {
            const newUser = await user.save()
            res.status(201).json({message: "deu tudo certo"})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }
}