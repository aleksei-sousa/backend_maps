const express = require("express")
const app = express()
const cors = require('cors')
require('dotenv').config();

app.use(cors({ credentials: true, origin: true}))

const port = process.env.PORT;
console.log(port)

app.use(express.json())

//db conect
const conn = require('./db/conn')
conn();

const UserRoutes = require('./routes/UsersRoutes')
const TerritoriosRoutes = require('./routes/TerritoriosRoutes')

app.use('/territorios', TerritoriosRoutes)
app.use('/users', UserRoutes)

app.listen(port, ()=>{
    console.log('servidor rodando!!')
})
