const parametros = new URLSearchParams(window.location.search)
const modo = parametros.get("modo")
const id = parametros.get("id")

const formulario = document.getElementById("formulario")

window.onload = async function () {
    if (modo === "ins") return

    try {
        const response = await fetch("http://localhost:5000/artistas/" + id)
        const artista = await response.json()

        nome.value = artista.nome
        nacionalidade.value = artista.nacionalidade
        dataNascimento.value = artista.dataNascimento?.substring(0, 10)
        dataFalecimento.value = artista.dataFalecimento?.substring(0, 10)
        biografia.value = artista.biografia
        estiloArtistico.value = artista.estiloArtistico
        premios.value = artista.premios?.join(", ")
        website.value = artista.website
        periodoArtistico.value = artista.periodoArtistico

        if (modo === "dsp") {
            document.querySelectorAll("input, textarea").forEach(el => el.disabled = true)
            document.getElementById("btnGravar").disabled = true
        }
    } catch (error) {
        alert(error)
    }
}

formulario.addEventListener('submit', async function (e) {
    e.preventDefault()

    try {
        const dados = {
            nome: nome.value,
            nacionalidade: nacionalidade.value,
            dataNascimento: dataNascimento.value,
            dataFalecimento: dataFalecimento.value,
            biografia: biografia.value,
            estiloArtistico: estiloArtistico.value,
            premios: premios.value.split(",").map(p => p.trim()),
            website: website.value,
            periodoArtistico: periodoArtistico.value
        }

        let response

        if (modo === "ins") {
            response = await fetch("http://localhost:5000/artistas", {
                method: "POST",
                body: JSON.stringify(dados),
                headers: { "Content-Type": "application/json" }
            })
        } else {
            response = await fetch("http://localhost:5000/artistas/" + id, {
                method: "PUT",
                body: JSON.stringify(dados),
                headers: { "Content-Type": "application/json" }
            })
        }

        const retorno = await response.json()

        if (!response.ok) {
            alert(retorno.message)
            return
        }

        alert("Registro gravado com sucesso!")
        window.location.href = "artista.html"
    } catch (error) {
        alert(error)
    }
})

btnSaida.addEventListener("click", function (e) {
    e.preventDefault()
    window.location.href = "artista.html"
})
