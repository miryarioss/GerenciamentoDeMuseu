const btnvoltar = document.getElementById("voltar");
const btninserir = document.getElementById("inserir");

btnvoltar.addEventListener("click", function () {
    window.location.href = "menu.html";
});

btninserir.addEventListener("click", function () {
    window.location.href = "crudartista.html?modo=ins&id=";
});

window.onload = function () {
    carregarDados();
};

async function excluir(id) {
    try {
        await fetch("http://localhost:5000/artistas/" + id, {
            method: "DELETE"
        });

        carregarDados();
    } catch (error) {
        alert(error);
    }
}

async function alterar(id) {
    window.location.href = "crudartista.html?id=" + id + "&modo=upd";
}

async function consultar(id) {
    window.location.href = "crudartista.html?id=" + id + "&modo=dsp";
}

async function carregarDados() {
    try {
        const response = await fetch("http://localhost:5000/artistas");
        const lista = await response.json();

        const tabela = document.getElementById("linharegistro");
        tabela.innerHTML = "";

        lista.forEach(a => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${a.nome}</td>
                <td>${a.nacionalidade || ""}</td>
                <td>${a.estiloArtistico || ""}</td>
                <td>
                    <button onclick="alterar('${a._id}')">Alterar</button>
                    <button onclick="consultar('${a._id}')">Consultar</button>
                    <button onclick="excluir('${a._id}')">Excluir</button>
                </td>
            `;
            tabela.appendChild(tr);
        });

    } catch (error) {
        alert(error);
    }
}
