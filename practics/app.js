let habits = JSON.parse(localStorage.getItem('habits')) || [];
let totalPoints = parseInt(localStorage.getItem('points')) || 0;

const form = document.getElementById('habit-form');
const input = document.getElementById('habit-name');
const container = document.getElementById('habits-container');
const filterInput = document.getElementById('filter');
const totalPointsEl = document.getElementById('total-points');
const avatar = document.getElementById('avatar');

//mostrar habitos:
function renderHabits(habitsToRender) {
    container.innerHTML = '';

    habitsToRender.forEach((habit, index) => {
        const div = document.createElement('div');
        const disabled = habit.clicks >= 4 ? 'disabled' : ''; // 👈 validamos clicks

        div.innerHTML = `
      <strong>${habit.name}</strong> - Puntos: ${habit.points} - Clicks: ${habit.clicks}/4
      <button onclick="addPoints(${index})" ${disabled}>+20</button>
      <button onclick="editHabit(${index})">Editar</button>
      <button onclick="deleteHabit(${index})">Eliminar</button>
    `;
        container.appendChild(div);
    });

    totalPointsEl.textContent = totalPoints;
    updateAvatar();
}

//agregar habitos:
form.addEventListener('submit', e => {
    e.preventDefault();
    const newHabit = { name: input.value, points: 0, clicks: 0 };
    habits.push(newHabit);
    saveData();
    renderHabits(habits);
    form.reset();
});
//guardar en local storage:
function saveData() {
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('points', totalPoints);
}

//sumar puntos y subir de nivel:
function addPoints(index) {
    // Si ya llegó a 4 clics, mostramos la alerta y salimos
    if (habits[index].clicks >= 4) {
        alert("Este hábito ya alcanzó el máximo de 4 clics.");
        return;
    }

    // Sumar puntos y clics
    habits[index].points += 20;
    habits[index].clicks += 1;
    totalPoints += 20;

    // Si justo ahora llegó al 4to clic, mostramos la alerta
    if (habits[index].clicks === 4) {
        alert("¡Este hábito alcanzó los 4 clics permitidos!");
    }

    saveData();
    renderHabits(habits);
}

//editar habitos:
function editHabit(index) {
    const newName = prompt("Nuevo nombre del hábito:", habits[index].name);
    if (newName) {
        habits[index].name = newName;
        habits[index].clicks = 0; // 👈 reinicia clics si deseas
        habits[index].points = 0; // 👈 también podrías resetear puntos si aplica
        saveData();
        renderHabits(habits);
    }
}

function deleteHabit(index) {
    totalPoints -= habits[index].points;      // 👈 Restamos puntos del hábito eliminado
    if (totalPoints < 0) totalPoints = 0;     // 👈 Por seguridad

    habits.splice(index, 1);                  // Eliminamos el hábito
    saveData();
    renderHabits(habits);
}

//filtrar habitos:
filterInput.addEventListener('input', () => {
    const search = filterInput.value.toLowerCase();
    const filtered = habits.filter(habit => habit.name.toLowerCase().includes(search));
    renderHabits(filtered);
});

//actualizar avatar segun puntos:   
function updateAvatar() {
    const avatar = document.getElementById("avatar");
    const pointsDisplay = document.getElementById("total-points");

    let level = 1;
    let maxPoints = 100;

    if (totalPoints >= 200) {
        level = 3;
        maxPoints = 300;
        avatar.src = "/img/fase3.webp";
    } else if (totalPoints >= 100) {
        level = 2;
        maxPoints = 200;
        avatar.src = "/img/fase2.jpg";
    } else {
        level = 1;
        maxPoints = 100;
        avatar.src = "/img/fase1.jpeg";
    }

    pointsDisplay.textContent = `${totalPoints}/${maxPoints}`;
}

function resetApp() {
    if (confirm("¿Seguro que quieres reiniciar todos los datos y volver a nivel 1?")) {
        localStorage.clear();       // Limpiamos todo del localStorage
        habits = [];                // Reiniciamos la lista de hábitos
        totalPoints = 0;            // Reiniciamos los puntos
        renderHabits(habits);       // Re-renderizamos la interfaz
        updateAvatar();             // Devolvemos avatar a nivel 1
    }
}

//cargar datos al iniciar:
renderHabits(habits);