const input = document.getElementById("task-input");
const form = document.getElementById("task-form");
const list = document.getElementById("list");
const counter = document.getElementById("counter");

let filtroActual = "all";
const tasksGuardadas = localStorage.getItem("tasks");
let tasks = tasksGuardadas ? JSON.parse(tasksGuardadas) : [];

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const texto = input.value.trim();

    if (texto === "") return;

    tasks.push({
        id: Date.now(),
        text: texto,
        completed: false,
    });
    guardarEnStorage();
    input.value = "";
    render();
});

const filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach((boton) => {
    boton.addEventListener("click", () => {
        filtroActual = boton.dataset.filter;
        render();
    });
});

function guardarEnStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
    list.innerHTML = "";
    let tareasAMostrar;

    if (filtroActual === "all") {
        tareasAMostrar = tasks;
    } else if (filtroActual === "pending") {
        tareasAMostrar = tasks.filter((task) => task.completed === false);
    } else if (filtroActual === "completed") {
        tareasAMostrar = tasks.filter((task) => task.completed === true);
    }

    tareasAMostrar.forEach((task) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const span = document.createElement("span");
        span.textContent = task.text;

        const btn = document.createElement("button");
        btn.textContent = "X";
        btn.classList.add("btn-eliminar");

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btn);
        li.dataset.id = task.id;

        if (task.completed) {
            li.classList.add("completed");
        }

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            guardarEnStorage();
            render();
        });

        btn.addEventListener("click", (event) => {
            event.stopPropagation();
            tasks = tasks.filter((n) => n.id !== task.id);
            guardarEnStorage();
            render();
        });

        span.addEventListener("dblclick", () => {
            const inputEditar = document.createElement("input");
            inputEditar.type = "text";
            inputEditar.value = task.text;
            inputEditar.classList.add("input-editar");

            li.replaceChild(inputEditar, span);
            inputEditar.focus();

            function guardarEdicion() {
                const nuevoTexto = inputEditar.value.trim();

                if (nuevoTexto !== "") {
                    task.text = nuevoTexto;
                    guardarEnStorage();
                }

                render();
            }

            inputEditar.addEventListener("blur", guardarEdicion);

            inputEditar.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    inputEditar.blur();
                }
            });
        });

        list.appendChild(li);
    });

    const pendientes = tasks.filter((task) => task.completed === false).length;
    counter.textContent = `${pendientes} tareas pendientes`;
}

render();