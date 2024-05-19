const mongoose = require('mongoose')

async function main() {
    try {
    //await mongoose.connect("mongodb+srv://mapa:IooXNh4P2fKuu2cY@cluster0.dnh57bd.mongodb.net/?retryWrites=true&w=majority")
    await mongoose.connect("mongodb+srv://mapa:IooXNh4P2fKuu2cY@cluster0.dnh57bd.mongodb.net/mapa?retryWrites=true&w=majority")

    console.log("conectou ao banco!")
} catch (error) {
    console.log(`Erro: ${error}`)
}}
    
module.exports = main