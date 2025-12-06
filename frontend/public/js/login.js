const formulario = document.getElementById("formulario")
const password = document.getElementById("password")
const email = document.getElementById("email")

formulario.addEventListener('submit',async function (e){
    e.preventDefault()

    const response = await fetch("http://localhost:5000/usuarios/login",{
        headers:{"Content-Type":"application/json"},
        method:"POST",
        body:JSON.stringify({email:email.value,password:password.value})
    })

    const usuario = await response.json()

    if (!response.ok){
        alert(usuario.message)
        return
    } else {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario))
        window.location.href = "menu.html"
    }
})