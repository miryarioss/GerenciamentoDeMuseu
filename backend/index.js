const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors({credentials:true,origin:['http://localhost:3000','http://127.0.0.1:3000']}))
app.use(express.json())
app.use(express.static('public'))

//Rota de usuário
const UsuarioRouter = require('./routes/UsuarioRouter')
app.use('/usuarios',UsuarioRouter)


app.listen(5000)