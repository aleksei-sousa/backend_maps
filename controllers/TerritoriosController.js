const mongoose = require('mongoose')
const Territorios = require('../models/Territorios')
const Concluidos = require('../models/Concluidos')
const getToken = require('../helpers/getToken')
const jwt = require('jsonwebtoken')
module.exports = class TerritoriosController {

    static async Subir (req, res) {

        const {numero, anotacoes, marcacoes, dataInicio} = req.body

        console.log(numero, anotacoes, marcacoes, dataInicio)

        const token = getToken(req)
        const decoded = jwt.verify(token, "nossosecret")
        const responsavel = decoded.name

        if(!numero){
            res.status(410).json({message: "sem número"})
            return
        }

        if(!dataInicio){
            res.status(410).json({message: "Digite a data do inicio"})
            return
        }

        if(!responsavel){
            res.status(410).json({message: "Sem responsável"})
            return
        }

        if(!anotacoes){
            res.status(410).json({message: "Sem Anotações"})
            return
        }

        // const anotacoesUpadate = {}
        // if(!anotacoes){
        //     anotacoesUpadate.vazio = ''
        // } else {
        //     anotacoesUpadate.vazio = anotacoes
        // }


        const mapaExist = await Territorios.findOne({numero: numero})
        //console.log(mapaExist)

        //se mapa não existe
        const ann = `${anotacoes}, ${responsavel}, ${dataInicio}`
        if(!mapaExist){
            const territorio = new Territorios ({
                numero: numero,
                anotacoes: ann,
                marcacoes: marcacoes,
                dataInicio: dataInicio,
            })
              console.log(territorio)
            try {
                const newTerritorio = territorio.save()
                res.status(210).json({message: "território adicionado"})
            } catch (error) {
                res.status(410).json({message: error})
            }
        } 
    }

    static async Get (req, res){
              
    // Consultando e retornando os valores de 'numero' de 1 a 25 em um objeto
        const territorios = await Territorios.find({ numero: { $gte: 0, $lte: 26 } })

        if (!territorios) {
            res.status(510).json({message: "sem mapas"})
        } else {
            res.status(210).json({
                message: territorios
            })
        }
    }

    static async Concluir (req, res) {
        const {numero, dataInicio, dataFinal, concluido} = req.body

        const token = getToken(req)
        const decoded = jwt.verify(token, "nossosecret")
        const responsavel = decoded.name


        if(!numero){
            res.status(410).json({message: "sem número"})
            return
        }

        if(!dataInicio){
            res.status(410).json({message: "Digite a data do inicio"})
            return
        }

        if(!dataFinal){
            res.status(410).json({message: "Digite a Data da Conclusão"})
            return
        }



            //adicionar ao db
            //remover do db e marcar concluído
            const conclusao = new Concluidos ({
                numero: numero,
                responsavel: responsavel,
                dataInicio: dataInicio,
                dataFinal: dataFinal,
            })

            try {
                const newConcluido = conclusao.save()
                res.status(210).json({message: "território fechado adicionado"})
            } catch (error) {
                res.status(410).json({message: error})
            }

            try {

            const filter = { numero: numero };
                const update = {
                    numero: numero,
                    responsavel: responsavel,
                    anotacoes: ' ! Recomece !',
                    marcacoes: '',
                    dataInicio: '',
                    dataFinal: '',
                    concluido: false
                };

                await Territorios.findOneAndUpdate(
                    filter,
                    update,
                    { new: true},
                )
            
            } catch (error) {
                return res.status(410).json({message: error})
                
            }

     }


     static async Adicionar (req, res) {

        const {numero, anotacoes, marcacoes, dataInicio} = req.body

        //console.log(numero, anotacoes, marcacoes, dataInicio)

        const token = getToken(req)
        //console.log(marcacoes)
        const decoded = jwt.verify(token, "nossosecret")
        const responsavel = decoded.name

        if(!numero){
            res.status(410).json({message: "sem número"})
            return
        }

        if(!anotacoes){
            res.status(410).json({message: "Sem Anotações"})
            return
        }

//verificar se é necessário criar no banco de dados
        const mapaExist = await Territorios.findOne({numero: numero})

        if (mapaExist){
            const ann = `${anotacoes}, ${responsavel}, ${dataInicio}`

            const filter = { numero: numero };
            
            try{
                //let doc = await Territorios.findOneAndUpdate(filter, update);
                await Territorios.findOneAndUpdate(
                    filter,
                    {   $push: { anotacoes: ann }   },
                    { new: true}
                )
                    res.status(210).json({
                        message: "Território atualizado"
                    })

            } catch (err) {
                res.status(500).json({ message: `errei mulk ${err}`})
            }
            return
        }

        const ann = `${anotacoes}, ${responsavel}, ${dataInicio}`
            
        const territorio = new Territorios ({
          numero: numero,
          anotacoes: ann,
          marcacoes: marcacoes,
          dataInicio: dataInicio,
        })
          console.log(territorio)
        try {
          const newTerritorio = territorio.save()
          res.status(210).json({message: "território adicionado"})
        } catch (error) {
          res.status(410).json({message: error})
        }

    }
    static async Delete (req, res){

        const {numero, posicaoArray} = req.body

        if(!numero){
            res.status(410).json({message: "sem número"})
            return
        }

        if(!posicaoArray){
            res.status(410).json({message: "sem número do array"})
            return
        }

        console.log(numero, posicaoArray)

        try{

            const territorio = await Territorios.findOne({ numero: numero });

            if (!territorio) {
                return res.status(404).json({ message: "Território não encontrado" });
            }

            territorio.anotacoes.splice(posicaoArray, 1);

            await territorio.save();
            return res.status(210).json({ message: "Anotação apagada" });

        } catch (err) {
            return res.status(500).json({ message: `Erro ao apagar anotação: ${err}` });
        }

    }

    static async Editar (req, res){
        const {numero, posicaoArray, anotacoes, dataInicio} = req.body

        const token = getToken(req)
        const decoded = jwt.verify(token, "nossosecret")
        const responsavel = decoded.name

        if(!numero){
            res.status(410).json({message: "sem número"})
            return
        }

        if(!anotacoes){
            res.status(410).json({message: "sem anotações"})
            return
        }

        if(!dataInicio){
            res.status(410).json({message: "sem data"})
            return
        }

        if(!posicaoArray){
            res.status(410).json({message: "sem número do array"})
            return
        }

        const ann = `${anotacoes}, ${responsavel}, ${dataInicio}`

        try{

            const territorio = await Territorios.findOne({ numero: numero });

            if (!territorio) {
                return res.status(404).json({ message: "Território não encontrado" });
            }
""
            territorio.anotacoes[posicaoArray] = ann;

            await territorio.save();
            return res.status(210).json({ message: "Anotação editada com Sucesso !"});

        } catch (err) {
            return res.status(500).json({ message: `Erro ao editar anotação: ${err}` });
        }
    }
}