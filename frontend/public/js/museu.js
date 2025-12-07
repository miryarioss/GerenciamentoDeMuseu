const btnvoltar = document.getElementById("voltar");
const btninserir = document.getElementById("inserir");

btnvoltar.addEventListener("click", function () {
    window.location.href = "menu.html";
});

btninserir.addEventListener("click", function () {
    window.location.href = "crudmuseu.html?modo=ins&id=";
});

window.onload = function () {
    carregarDados();
};

async function excluir(id) {
    try {
        await fetch("http://localhost:5000/museus/" + id, {
            method: "DELETE"
        });

        carregarDados();
    } catch (error) {
        alert(error);
    }
}

async function alterar(id) {
    window.location.href = "crudmuseu.html?id=" + id + "&modo=upd";
}

async function consultar(id) {
    window.location.href = "crudmuseu.html?id=" + id + "&modo=dsp";
}

async function carregarDados() {
    try {
        const response = await fetch("http://localhost:5000/museus");
        const lista = await response.json();

        const tabela = document.getElementById("linharegistro");
        tabela.innerHTML = "";

        lista.forEach(m => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${m.nome}</td>
                <td>${m.localizacao || ""}</td>
                <td>${m.tipo || ""}</td>
                <td>
                    <button onclick="alterar('${m._id}')">Alterar</button>
                    <button onclick="consultar('${m._id}')">Consultar</button>
                    <button onclick="excluir('${m._id}')">Excluir</button>
                </td>
            `;
            tabela.appendChild(tr);
        });

    } catch (error) {
        alert(error);
    }
}
