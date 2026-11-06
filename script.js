document.addEventListener("DOMContentLoaded", () => {
    const tarefas = JSON.parse(localStorage.getItem("vyron_tarefas")) || [];
    const habitos = JSON.parse(localStorage.getItem("vyron_habitos")) || [];
    const metas = JSON.parse(localStorage.getItem("vyron_metas")) || [];

    const concluidas = tarefas.filter(t => t.concluida).length;
    const habitosAtivos = habitos.length;
    const metasAtivas = metas.filter(m => m.progresso < m.alvo).length;

    const cards = document.querySelectorAll(".stat-card h2");

    if (cards[0]) cards[0].textContent = concluidas;
    if (cards[1]) cards[1].textContent = habitosAtivos;
    if (cards[2]) cards[2].textContent = metasAtivas;

    const circulo = document.querySelector(".progress-circle strong");

    if (circulo) {
        const porcentagem = tarefas.length
            ? Math.round((concluidas / tarefas.length) * 100)
            : 0;

        circulo.textContent = porcentagem + "%";
    }

    const lista = document.querySelector("#dashboardTasks");

    if (lista) {
        lista.innerHTML = "";

        if (tarefas.length === 0) {
            lista.textContent = "Nenhuma tarefa registrada.";
        } else {
            tarefas.slice(-5).reverse().forEach(tarefa => {
                const item = document.createElement("div");
                item.className = "task-item";

                const nome = document.createElement("span");
                nome.textContent = tarefa.nome;

                const status = document.createElement("span");
                status.textContent = tarefa.concluida ? "Concluída" : "Pendente";

                item.append(nome, status);
                lista.appendChild(item);
            });
        }
    }

    console.log("VYRON conectado.");
});