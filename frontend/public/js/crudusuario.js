const parametros = new URLSearchParams(window.location.search)
const formulario = document.getElementById("formulario")
const modo = parametros.get("modo")
const id = parametros.get("id")

window.onload = async function () {
    if (modo === "ins") return

    try {
        const response = await fetch("http://localhost:5000/usuarios/" + id)
        const usuario = await response.json()

        document.getElementById("nome").value = usuario.nome
        document.getElementById("email").value = usuario.email
        document.getElementById("telefone").value = usuario.telefone
        document.getElementById("password").value = usuario.password
        document.getElementById("confirmpassword").disabled = true

        if (modo == "dsp") {
            document.getElementById("nome").disabled = true
            document.getElementById("email").disabled = true
            document.getElementById("telefone").disabled = true
            document.getElementById("password").disabled = true
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
            email: email.value,
            telefone: telefone.value,
            password: password.value,
            confirmpassword: confirmpassword.value
        }

        let response

        if (modo == "ins") {
            response = await fetch("http://localhost:5000/usuarios", {
                method: "POST",
                body: JSON.stringify(dados),
                headers: { "Content-Type": "application/json" }
            })
        } else {
            response = await fetch("http://localhost:5000/usuarios/" + id, {
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

        alert("Usuário cadastrado com sucesso!")
        window.location.href = "usuario.html"
    } catch (error) {
        alert(error)
    }
})

document.getElementById("btnSaida").addEventListener("click", function (e) {
    e.preventDefault()
    window.location.href = "usuario.html"
})
