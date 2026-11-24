
const formulario = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const correo = document.getElementById("correo").value.trim().toLowerCase();
    const contrasena = document.getElementById("contrasena").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(usuario =>
        usuario.correo === correo &&
        usuario.contrasena === contrasena
    );

    if (!usuarioEncontrado) {
        mensaje.textContent = "Correo o contraseña incorrectos.";
        return;
    }

    localStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuarioEncontrado)
    );

    window.location.href = "inicio.html";

});
