const mongoose = require('mongoose')

//const uri = "pegar do mongoDB cloud";
async function conectar() {
    await mongoose.connect(uri)
    console.log("Conectou no MongoDB")
}

conectar().catch(console.log)

module.exports = mongoose