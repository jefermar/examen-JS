const formHabito = document.getElementById("formHabito");
const inputHabito = document.getElementById("inputHabito");
const listaHabitos = document.getElementById("listaHabitos");
const buscador = document.getElementById("buscador");

// Array donde se almacenan las habitos
let habitos = [];

// Evento para agregar una nueva habito
formHabito.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = inputHabito.value.trim();
  if (texto === "") return;

  const nuevahabito = {
    id: Date.now(),
    texto,
    completada: false
  };

  habitos.push(nuevahabito);       // Añadimos el habito
  inputHabito.value = "";         // Limpiamos el input
  mostrarhabitos();               // Actualizamos la lista
});

// Evento para filtrar habitos
buscador.addEventListener("input", () => {
  mostrarhabitos(buscador.value.toLowerCase());
});

// Función para renderizar habitos
function mostrarhabitos(filtro = "") {
  listaHabitos.innerHTML = ""; // Limpiar HTML antes de mostrar

  habitos
    .filter(t => t.texto.toLowerCase().includes(filtro)) // Buscar por texto
    .forEach(habito => {
      const li = document.createElement("li");
      if (habito.editando) {
        const inputEdit = document.createElement("input");
        inputEdit.className = "edit-input";
        inputEdit.value = habito.texto;

        inputEdit.addEventListener("keyup", (e) => {
          if (e.key === "Enter") {
            habito.texto = inputEdit.value;
            habito.editando = false;
            mostrarhabitos(buscador.value.toLowerCase());
          }
        });

        li.appendChild(inputEdit);
      } else {
        const span = document.createElement("span");
        span.textContent = habito.texto;
        if (habito.completada) li.classList.add("completada");

        span.addEventListener("click", () => {
          habito.completada = !habito.completada;
          mostrarhabitos(buscador.value.toLowerCase());
        });

        li.appendChild(span);
      }

      // Botón editar
      const btnEditar = document.createElement("button");
      btnEditar.textContent = "✏";
      btnEditar.addEventListener("click", () => {
        habito.editando = true;
        mostrarhabitos(buscador.value.toLowerCase());
      });

      // Botón eliminar
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "🗑";
      btnEliminar.addEventListener("click", () => {
        habitos = habitos.filter(t => t.id !== habito.id);
        mostrarhabitos(buscador.value.toLowerCase());
      });

      li.appendChild(btnEditar);
      li.appendChild(btnEliminar);
      listaHabitos.appendChild(li);
    });
}
