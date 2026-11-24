
const puntos = Number(localStorage.getItem("resultadoPuntos")) || 0;
const vidas = Number(localStorage.getItem("resultadoVidas")) || 0;
const completado = localStorage.getItem("resultadoCompletado") === "true";

const titulo = document.getElementById("tituloResultado");
const mensaje = document.getElementById("mensajeResultado");

document.getElementById("puntosFinales").textContent = puntos;
document.getElementById("vidasFinales").textContent = vidas;

if (completado) {
    titulo.textContent = "¡NIVEL COMPLETADO!";
    mensaje.textContent = "¡Excelente trabajo! Has superado todas las preguntas.";
    document.getElementById("estadoNivel").textContent = "Completado";
} else {
    titulo.textContent = "¡SE ACABÓ LA PARTIDA!";
    mensaje.textContent = "No te rindas. Puedes intentarlo nuevamente.";
    document.getElementById("estadoNivel").textContent = "No completado";
}
