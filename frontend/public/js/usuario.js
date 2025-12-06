const btnvoltar = document.getElementById("voltar");
const btninserir = document.getElementById("inserir");

btnvoltar.addEventListener("click",function (){
    window.location.href = "menu.html"
})

btninserir.addEventListener("click",function (){
    window.location.href = "crudusuario.html?modo=ins&id="
})

window.onload = function () {
    carregarDados()
}

async function excluir(id){
    try {
        const response = await fetch("http://localhost:5000/usuarios/"+id,{
            method:"DELETE"
        })

        carregarDados()
    } catch (error) {
        alert(error)
    }
}

async function alterar(id){
    try {
       window.location.href = "crudusuario.html?id="+id+"&modo=upd" 
    } catch (error) {
        alert(error)
    }
}

async function consultar(id){
    try {
       window.location.href = "crudusuario.html?id="+id+"&modo=dsp" 
    } catch (error) {
        alert(error)
    }
}

async function carregarDados() {
    try {
        const response = await fetch("http://localhost:5000/usuarios")
        const usuarios = await response.json()

        const tabela = document.getElementById("linharegistro")
        tabela.innerHTML = ""
        usuarios.forEach(u => {
            const tr = document.createElement("tr")
            tr.innerHTML = `
                <td>${u.nome}</td>
                <td>${u.email}</td>
                <td>${u.telefone}</td>
                <td>
                    <button onclick="alterar('${u._id}')">Alterar</button>
                    <button onclick="consultar('${u._id}')">Consultar</button>
                    <button onclick="excluir('${u._id}')">Excluir</button>
                </td>
            `
            tabela.appendChild(tr)
        });
    } catch (error) {
        alert(error)
    }
}


