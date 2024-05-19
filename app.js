const express = require("express")
const app = express()
const cors = require('cors')

app.use(cors({ credentials: true, origin: true}))

app.use(express.json())

//db conect
const conn = require('./db/conn')
conn();

const UserRoutes = require('./routes/UsersRoutes')
const TerritoriosRoutes = require('./routes/TerritoriosRoutes')

app.use('/territorios', TerritoriosRoutes)
app.use('/users', UserRoutes)

app.listen(3000, ()=>{
    console.log('servidor rodando!!')
})
