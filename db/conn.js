const mongoose = require('mongoose')

const db = process.env.DB;
console.log(db)

async function main() {
    try {

    await mongoose.connect(db)
    console.log("conectou ao banco!")

} catch (error) {

    console.log(`Erro: ${error}`)
    
}}
    
module.exports = main