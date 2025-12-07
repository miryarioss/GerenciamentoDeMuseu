const btnvoltar = document.getElementById("voltar");
const btninserir = document.getElementById("inserir");

btnvoltar.addEventListener("click", function () {
    window.location.href = "menu.html";
});

btninserir.addEventListener("click", function () {
    window.location.href = "crudobra.html?modo=ins&id=";
});

window.onload = function () {
    carregarDados();
};

async function excluir(id) {
    try {
        await fetch("http://localhost:5000/obras/" + id, {
            method: "DELETE"
        });

        carregarDados();
    } catch (error) {
        alert(error);
    }
}

async function alterar(id) {
    window.location.href = "crudobra.html?id=" + id + "&modo=upd";
}

async function consultar(id) {
    window.location.href = "crudobra.html?id=" + id + "&modo=dsp";
}

async function carregarDados() {
    try {
        const response = await fetch("http://localhost:5000/obras");
        const lista = await response.json();

        const tabela = document.getElementById("linharegistro");
        tabela.innerHTML = "";

        lista.forEach(o => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${o.titulo}</td>
                <td>${o.anoCriacao || ""}</td>
                <td>${o.artistaId?.nome || ""}</td>
                <td>${o.museuId?.nome || ""}</td>
                <td>
                    <button onclick="alterar('${o._id}')">Alterar</button>
                    <button onclick="consultar('${o._id}')">Consultar</button>
                    <button onclick="excluir('${o._id}')">Excluir</button>
                </td>
            `;
            tabela.appendChild(tr);
        });

    } catch (error) {
        alert(error);
    }
}
