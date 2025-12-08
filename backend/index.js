const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({
    credentials: true,
    origin: '*',
    //origin: [
    //    'http://localhost:3000',
    //    'http://127.0.0.1:3000',
    //    'http://localhost:5500',
    //    'http://127.0.0.1:5500'
    //]
}))

app.use(express.json())

const UsuarioRouter = require('./routes/UsuarioRouter')
const ArtistaRouter = require('./routes/ArtistaRouter')
const MuseuRouter = require('./routes/MuseuRouter')
const ObraDeArteRouter = require('./routes/ObraDeArteRouter')

app.use('/usuarios', UsuarioRouter)
app.use('/artistas', ArtistaRouter)
app.use('/museus', MuseuRouter)
app.use('/obras', ObraDeArteRouter)
app.use(express.static('public'))

app.listen(5000)
