const parametros = new URLSearchParams(window.location.search)
const modo = parametros.get("modo")
const id = parametros.get("id")

const formulario = document.getElementById("formulario")

window.onload = async function () {
    if (modo === "ins") return

    try {
        const response = await fetch("http://localhost:5000/museus/" + id)
        const museu = await response.json()

        nome.value = museu.nome
        localizacao.value = museu.localizacao
        anoFundacao.value = museu.anoFundacao
        descricao.value = museu.descricao
        tipo.value = museu.tipo
        site.value = museu.site
        telefone.value = museu.telefone
        email.value = museu.email
        capacidadeVisitantes.value = museu.capacidadeVisitantes

        if (modo === "dsp") {
            document.querySelectorAll("input, textarea").forEach(el => el.disabled = true)
            btnGravar.disabled = true
        }
    } catch (error) {
        alert(error)
    }
}

formulario.addEventListener("submit", async function (e) {
    e.preventDefault()

    try {
        const dados = {
            nome: nome.value,
            localizacao: localizacao.value,
            anoFundacao: anoFundacao.value,
            descricao: descricao.value,
            tipo: tipo.value,
            site: site.value,
            telefone: telefone.value,
            email: email.value,
            capacidadeVisitantes: capacidadeVisitantes.value
        }

        let response

        if (modo === "ins") {
            response = await fetch("http://localhost:5000/museus", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            })
        } else {
            response = await fetch("http://localhost:5000/museus/" + id, {
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

        alert("Museu gravado com sucesso!")
        window.location.href = "museu.html"
    } catch (error) {
        alert(error)
    }
})

btnSaida.addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "museu.html"
})
