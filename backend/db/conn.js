const mongoose = require('mongoose')

const uri = "mongodb+srv://mirya_db:Aleatorio1@cluster0.fefilgr.mongodb.net/gerenciamento_museu?retryWrites=true&w=majority&appName=Cluster0";

async function conectar() {
    await mongoose.connect(uri)
    console.log("Conectou no MongoDB")
}

conectar().catch(console.log)

module.exports = mongoose
