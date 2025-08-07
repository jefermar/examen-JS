const formHabito = document.getElementById("formHabito");
const inputHabito = document.getElementById("inputHabito");
const listaHabitos = document.getElementById("listaHabitos");
const buscador = document.getElementById("buscador");
const body = document.querySelector("body");
const cargarDatoslocalStorage = localStorage.getItem("tema");

// Array donde se almacenan los habitos
let habitos = [];

// Evento para agregar un nuevo habito
formHabito.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = inputHabito.value.trim();
  if (texto === "") return;

  const nuevaHabito = {
    id: Date.now(),
    texto,
    completada: false
  };

  habitos.push(nuevaHabito);  // Añadimos el habito   
  inputHabito.value = "";         // Limpiamos el input
  mostrarhabitos();               // Actualizamos la lista
});



function cargarDatoslocalStorage(habito){
  const habitos = JSON.parse(localStorage.getItem("habitos")) || [];
  habitos.push(habito);
  localStorage.setItem("habitos", JSON.stringify(habitos));
}

function cargarHabitos(){
  const habitos = JSON.parse(localStorage.getItem("habitos")) || [];
  habitos.forEach(habito =>{
    listaHabitos.append(nuevaHabito(habito)); 
  });
}

function actualizarLocalStorage(){
  const habitos = Array.from(listaHabitos.querySelectorAll("li")).map((li)=>li.firstChild.textContent);
  localStorage.setItem("habitos", JSON.stringify(habitos));
}

// Evento para filtrar habitos 
buscador.addEventListener("input", () => {
  mostrarhabitos(buscador.value.toLowerCase());
});
// Función para renderizar habitos (filtrado)
function mostrarhabitos(filtro = "") {
  listaHabitos.innerHTML = ""; // Limpiar HTML antes de mostrar

  habitos
    .filter(t => t.texto.toLowerCase().includes(filtro)) // Buscar por texto
    .forEach(habito => {
      const li = document.createElement("li");

      // Si el habito está siendo editado, mostramos input
      if (habito.editando) {
        const inputEdit = document.createElement("input");
        inputEdit.className = "edit-input";
        inputEdit.value = habito.texto;
        actualizarLocalStorage(habito);

        inputEdit.addEventListener("keyup", (e) => {
          if (e.key === "Enter") {
            habito.texto = inputEdit.value;
            habito.editando = false;
            mostrarhabitos(buscador.value.toLowerCase());
            actualizarLocalStorage(mostrarhabitos);
          }
        });

        li.appendChild(inputEdit);
      } else {
        const span = document.createElement("span");
        span.textContent = habito.texto;
        if (habito.completada) li.classList.add("completada");

        // Marcar como completado al hacer click
        span.addEventListener("click", () => {
          habito.completada = !habito.completada;
          mostrarhabitos(buscador.value.toLowerCase());
           actualizarLocalStorage(mostrarhabitos);
        });

        li.appendChild(span);
      }

      // Botón editar
      const btnEditar = document.createElement("button");
      btnEditar.textContent = "✏";
      btnEditar.addEventListener("click", () => {
        habito.editando = true;
        mostrarhabitos(buscador.value.toLowerCase());
         actualizarLocalStorage(mostrarhabitos);
      });

      // Botón eliminar
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "🗑";
      btnEliminar.addEventListener("click", () => {
        habitos = habitos.filter(t => t.id !== habito.id);
        mostrarhabitos(buscador.value.toLowerCase());
  actualizarLocalStorage(mostrarhabitos);
      });

      li.appendChild(btnEditar);
      li.appendChild(btnEliminar);
      listaHabitos.appendChild(li);
    });
}

/*
 localStorage.setItem("habitos", JSON.stringify(habitos))

 const hGuard = localStorage.getItem("habitos");
 if(hGuard){
  habitos = JSON.parse(hGuard)
 }
 renderizar();*/