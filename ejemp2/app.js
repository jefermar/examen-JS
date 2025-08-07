const habitList = document.getElementById("habitos-ul");
const habitNameInput = document.getElementById("habit-name");
const buscarHabitosInput = document.getElementById("buscar-habitos");
const reiniciarNivelButton = document.getElementById("reiniciar-nivel");
const puntosDisplay = document.getElementById("puntos");
const nivelesDisplay = document.getElementById("niveles");
const avatarDisplay = document.getElementById("avatar");
const botonAgregar = document.getElementById("boton");

let puntos = 0;
let niveles = 0;
let avatars = ["😀", "✅💻", "😄", "😁"];

/**
 * Guardar datos en localStorage
 */
function guardarDatos() {
    localStorage.setItem("avatars", JSON.stringify(avatars));
    localStorage.setItem("puntos", puntos);
    localStorage.setItem("niveles", niveles);
    puntosDisplay.textContent = `Puntos: ${puntos}`;
    nivelesDisplay.textContent = `Niveles: ${niveles}`;
    avatarDisplay.textContent = avatars[niveles];
}
guardarDatos();

/**
 * crear habitos
 */
function crearHabitos(name) {
    let repeticiones = 0;
    let puntosOtorgados = false; // ✅ NUEVO: bandera para evitar doble suma

    const habito = document.createElement("li");
    const habitName = document.createElement("span");
    const repeticionesBoton = document.createElement("button");

    repeticionesBoton.textContent = `${repeticiones} /4`;
    habitName.textContent = name;

    habito.appendChild(habitName);
    habitList.appendChild(habito);
    habito.appendChild(repeticionesBoton);

    repeticionesBoton.addEventListener("click", function () {
        if (repeticiones < 4) {
            repeticiones++;
            repeticionesBoton.textContent = `${repeticiones} /4`;

            if (repeticiones === 4 && !puntosOtorgados) {
                puntos += 20;
                puntosDisplay.textContent = `Puntos: ${puntos}`;
                puntosOtorgados = true; // ✅ Evita volver a sumar

                niveles = Math.floor(puntos / 100);
                nivelesDisplay.textContent = `Niveles: ${niveles}`;
                avatarDisplay.textContent = avatars[niveles] || "🏆";

                guardarDatos();
            }
        } else {
            alert("Has alcanzado el máximo de repeticiones para este hábito.");
        }
    });

    //filtrar habitos
    buscarHabitosInput.addEventListener("input", function() {
        const filtro = buscarHabitosInput.value.toLowerCase();
        const habitos = habitList.getElementsByTagName("li");
        for (let i = 0; i < habitos.length; i++) {
            const nombreHabito = habitos[i].getElementsByTagName("span")[0].textContent.toLowerCase();
            if (nombreHabito.includes(filtro)) {
                habitos[i].style.display = "";
            } else {
                habitos[i].style.display = "none";
            }
        }
    });

    reiniciarNivelButton.addEventListener("click", function() {
        puntos = 0;
        niveles = 0;
        avatarDisplay.textContent = avatars[niveles];
        puntosDisplay.textContent = `Puntos: ${puntos}`;
        nivelesDisplay.textContent = `Niveles: ${niveles}`;
    });

    // Agregar botón de eliminar
    const eliminarButton = document.createElement("button");
    eliminarButton.textContent = "Eliminar";
    eliminarButton.style.backgroundColor = "red";
    eliminarButton.style.color = "white";
    eliminarButton.style.border = "none";
    eliminarButton.style.padding = "5px 10px";
    eliminarButton.style.cursor = "pointer";
    eliminarButton.style.marginLeft = "1090px";
    habito.appendChild(eliminarButton);
    eliminarButton.addEventListener("click", function() {
        habitList.removeChild(habito);
        guardarDatos();
    });
}

/**
 * Agregar evento click al boton
 */
botonAgregar.addEventListener("click", function() {
    const habitName = habitNameInput.value.trim();
    if (habitName !== "") {
        crearHabitos(habitName);
        habitNameInput.value = "";
    }
});


