const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000']
}))
app.use(express.json())
app.use(express.static('public'))

const UsuarioRouter = require('./routes/UsuarioRouter')
const ArtistaRouter = require('./routes/ArtistaRouter')
const MuseuRouter = require('./routes/MuseuRouter')
const ObraDeArteRouter = require('./routes/ObraDeArteRouter')

app.use('/usuarios', UsuarioRouter)
app.use('/artistas', ArtistaRouter)
app.use('/museus', MuseuRouter)
app.use('/obras', ObraDeArteRouter)

app.listen(5000)
