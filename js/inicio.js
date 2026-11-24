
const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuario) {
    window.location.href = "login.html";
} else {

    document.getElementById("nombreUsuario").textContent =
        usuario.nombres;

    document.getElementById("nombreBienvenida").textContent =
        usuario.nombres;

}

const puntos = localStorage.getItem("puntos") || 0;
const nivel = localStorage.getItem("nivelActual") || 1;
const completados = localStorage.getItem("nivelesCompletados") || 0;

document.getElementById("puntos").textContent = puntos;
document.getElementById("nivel").textContent = nivel;
document.getElementById("completados").textContent = completados;

document.getElementById("cerrarSesion").addEventListener("click", function() {

    localStorage.removeItem("usuarioActivo");

    window.location.href = "login.html";

});
