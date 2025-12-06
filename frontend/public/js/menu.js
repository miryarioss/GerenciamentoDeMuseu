const usuario = document.getElementById("usuario")

const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))

usuario.innerText = "Seja bem-vindo " + usuarioLogado.nome