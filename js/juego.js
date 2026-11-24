
const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuario) {
    window.location.href = "login.html";
}

const parametros = new URLSearchParams(window.location.search);
const nivel = Number(parametros.get("nivel")) || 1;

const preguntas = {

    1: [
        {
            pregunta: "¿Qué es un algoritmo?",
            opciones: [
                "Un lenguaje de programación",
                "Una secuencia de pasos para resolver un problema",
                "Un programa de diseño",
                "Una base de datos"
            ],
            respuesta: 1
        },
        {
            pregunta: "¿Qué es una variable?",
            opciones: [
                "Un espacio para almacenar datos",
                "Un tipo de computadora",
                "Un navegador",
                "Un archivo de imagen"
            ],
            respuesta: 0
        },
        {
            pregunta: "¿Cuál de estos es un lenguaje de programación?",
            opciones: [
                "HTML",
                "CSS",
                "Python",
                "Photoshop"
            ],
            respuesta: 2
        },
        {
            pregunta: "¿Qué símbolo se utiliza para asignar un valor en JavaScript?",
            opciones: ["+", "=", "*", "/"],
            respuesta: 1
        },
        {
            pregunta: "¿Qué es un dato?",
            opciones: [
                "Una información que puede procesarse",
                "Un tipo de teclado",
                "Una pantalla",
                "Un cable"
            ],
            respuesta: 0
        },
        {
            pregunta: "¿Qué estructura permite tomar decisiones?",
            opciones: [
                "if",
                "print",
                "input",
                "console"
            ],
            respuesta: 0
        },
        {
            pregunta: "¿Qué significa programar?",
            opciones: [
                "Diseñar computadoras",
                "Dar instrucciones a una computadora",
                "Instalar videojuegos",
                "Navegar por internet"
            ],
            respuesta: 1
        },
        {
            pregunta: "¿Qué función permite mostrar información en la consola de JavaScript?",
            opciones: [
                "alert()",
                "console.log()",
                "prompt()",
                "write()"
            ],
            respuesta: 1
        },
        {
            pregunta: "¿Qué es un bucle?",
            opciones: [
                "Una estructura que repite instrucciones",
                "Una variable",
                "Un tipo de dato",
                "Un error de sintaxis"
            ],
            respuesta: 0
        },
        {
            pregunta: "¿Qué extensión utilizan normalmente los archivos JavaScript?",
            opciones: [
                ".html",
                ".css",
                ".js",
                ".sql"
            ],
            respuesta: 2
        }
    ]

};

const preguntasNivel = preguntas[nivel];

if (!preguntasNivel) {
    alert("Este nivel todavía no está disponible.");
    window.location.href = "niveles.html";
}

if (!preguntasNivel) {
    alert("Este nivel todavía no tiene preguntas.");
    window.location.href = "niveles.html";
}

let preguntaActual = 0;
let puntos = 0;
let vidas = 3;
let tiempo = 20;
let respondida = false;
let intervalo;

const preguntaElemento = document.getElementById("pregunta");
const opcionesElemento = document.getElementById("opciones");
const mensaje = document.getElementById("mensaje");
const siguiente = document.getElementById("siguiente");

document.getElementById("nombreNivel").textContent =
    `NIVEL ${nivel}`;

function guardarPuntos() {
    const puntosTotales = Number(localStorage.getItem("puntos")) || 0;
    localStorage.setItem("puntos", puntosTotales + puntos);
}

function mostrarPregunta() {

    clearInterval(intervalo);

    respondida = false;
    tiempo = 20;

    siguiente.disabled = true;
    mensaje.textContent = "";

    const pregunta = preguntasNivel[preguntaActual];

    preguntaElemento.textContent = pregunta.pregunta;

    document.getElementById("numeroPregunta").textContent =
        `PREGUNTA ${preguntaActual + 1} / ${preguntasNivel.length}`;

    document.getElementById("progresoPregunta").style.width =
        `${((preguntaActual + 1) / preguntasNivel.length) * 100}%`;

    opcionesElemento.innerHTML = "";

    pregunta.opciones.forEach((opcion, indice) => {

        const boton = document.createElement("button");

        boton.className = "opcion";
        boton.textContent = `${String.fromCharCode(65 + indice)}) ${opcion}`;

        boton.addEventListener("click", () => comprobarRespuesta(indice));

        opcionesElemento.appendChild(boton);

    });

    actualizarEstadisticas();
    iniciarTemporizador();

}

function actualizarEstadisticas() {

    document.getElementById("puntos").textContent = puntos;

    document.getElementById("vidas").textContent =
        "❤️ ".repeat(vidas) + "🖤 ".repeat(3 - vidas);

    document.getElementById("temporizador").textContent =
        `⏱️ ${tiempo}`;

}

function iniciarTemporizador() {

    intervalo = setInterval(() => {

        tiempo--;

        actualizarEstadisticas();

        if (tiempo <= 0) {
            comprobarRespuesta(-1);
        }

    }, 1000);

}

function comprobarRespuesta(indice) {

    if (respondida) return;

    respondida = true;

    clearInterval(intervalo);

    const pregunta = preguntasNivel[preguntaActual];

    const botones = opcionesElemento.querySelectorAll(".opcion");

    botones.forEach((boton, i) => {

        boton.disabled = true;

        if (i === pregunta.respuesta) {
            boton.classList.add("correcta");
        }

        if (i === indice && indice !== pregunta.respuesta) {
            boton.classList.add("incorrecta");
        }

    });

    if (indice === pregunta.respuesta) {

        puntos += 10;

        mensaje.textContent = "¡Correcto! Has ganado 10 puntos.";

        mensaje.style.color = "#20d68a";

    } else {

        vidas--;

        mensaje.textContent = indice === -1
            ? "¡Se acabó el tiempo!"
            : "Respuesta incorrecta. ¡Sigue intentando!";

        mensaje.style.color = "#ff5c70";

    }

    actualizarEstadisticas();

    siguiente.disabled = false;

    if (vidas <= 0) {
        siguiente.textContent = "VER RESULTADOS";
    }

}

siguiente.addEventListener("click", function() {

    if (vidas <= 0) {
        finalizarJuego(false);
        return;
    }

    preguntaActual++;

    if (preguntaActual >= preguntasNivel.length) {
        finalizarJuego(true);
        return;
    }

    siguiente.textContent = "SIGUIENTE PREGUNTA →";

    mostrarPregunta();

});

function finalizarJuego(completado) {

    clearInterval(intervalo);

    guardarPuntos();

    if (completado) {

        let nivelesCompletados =
            Number(localStorage.getItem("nivelesCompletados")) || 0;

        if (nivel > nivelesCompletados) {
            nivelesCompletados = nivel;
            localStorage.setItem("nivelesCompletados", nivelesCompletados);
        }

        localStorage.setItem("nivelActual", Math.min(nivel + 1, 5));

    }

    localStorage.setItem("resultadoPuntos", puntos);
    localStorage.setItem("resultadoVidas", vidas);
    localStorage.setItem("resultadoCompletado", completado);

    window.location.href = "resultados.html";

}

mostrarPregunta();
