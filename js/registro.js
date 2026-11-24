
const formulario = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nombres = document.getElementById("nombres").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const edad = Number(document.getElementById("edad").value);
    const sexo = document.getElementById("sexo").value;
    const correo = document.getElementById("correo").value.trim().toLowerCase();
    const telefono = document.getElementById("telefono").value.trim();
    const contrasena = document.getElementById("contrasena").value;
    const confirmar = document.getElementById("confirmar").value;
    const terminos = document.getElementById("aceptarTerminos").checked;

    if (edad < 13 || edad > 100) {
        mensaje.textContent = "La edad no es válida.";
        return;
    }

    if (contrasena !== confirmar) {
        mensaje.textContent = "Las contraseñas no coinciden.";
        return;
    }

    if (!terminos) {
        mensaje.textContent = "Debes aceptar los términos y condiciones.";
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.some(usuario => usuario.correo === correo);

    if (existe) {
        mensaje.textContent = "Este correo ya está registrado.";
        return;
    }

    const nuevoUsuario = {
        nombres,
        apellidos,
        edad,
        sexo,
        correo,
        telefono,
        contrasena
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("¡Cuenta creada correctamente!");

    window.location.href = "login.html";

});
