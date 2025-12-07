const parametros = new URLSearchParams(window.location.search)
const modo = parametros.get("modo")
const id = parametros.get("id")

const formulario = document.getElementById("formulario")

window.onload = async function () {
    carregarCombos()

    if (modo === "ins") return

    try {
        const response = await fetch("http://localhost:5000/obras/" + id)
        const obra = await response.json()

        titulo.value = obra.titulo
        anoCriacao.value = obra.anoCriacao
        descricao.value = obra.descricao
        tecnicaPintura.value = obra.tecnicaPintura
        dimensoes.value = obra.dimensoes
        material.value = obra.material
        localizacaoDentroMuseu.value = obra.localizacaoDentroMuseu
        artistaId.value = obra.artistaId
        museuId.value = obra.museuId

        if (modo === "dsp") {
            document.querySelectorAll("input, textarea, select").forEach(el => el.disabled = true)
            btnGravar.disabled = true
        }
    } catch (error) {
        alert(error)
    }
}

async function carregarCombos() {
    const artistas = await fetch("http://localhost:5000/artistas").then(r => r.json())
    const museus = await fetch("http://localhost:5000/museus").then(r => r.json())

    artistas.forEach(a => {
        artistaId.innerHTML += `<option value="${a._id}">${a.nome}</option>`
    })

    museus.forEach(m => {
        museuId.innerHTML += `<option value="${m._id}">${m.nome}</option>`
    })
}

formulario.addEventListener("submit", async function (e) {
    e.preventDefault()

    try {
        const dados = {
            titulo: titulo.value,
            anoCriacao: anoCriacao.value,
            descricao: descricao.value,
            tecnicaPintura: tecnicaPintura.value,
            dimensoes: dimensoes.value,
            material: material.value,
            localizacaoDentroMuseu: localizacaoDentroMuseu.value,
            artistaId: artistaId.value,
            museuId: museuId.value
        }

        let response

        if (modo === "ins") {
            response = await fetch("http://localhost:5000/obras", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            })
        } else {
            response = await fetch("http://localhost:5000/obras/" + id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            })
        }

        const retorno = await response.json()

        if (!response.ok) {
            alert(retorno.message)
            return
        }

        alert("Obra gravada com sucesso!")
        window.location.href = "obra.html"
    } catch (error) {
        alert(error)
    }
})

btnSaida.addEventListener("click", function (e) {
    e.preventDefault()
    window.location.href = "obraDeArte.html"
})
