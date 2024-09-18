// Obtener las referencias a los elementos del DOM
let cantidad = document.getElementById("cantidad");
let boton = document.getElementById("generar");
let contrasena = document.getElementById("contrasena");
let botonLimpiar = document.getElementById("limpiar");

// Definimos los caracteres permitidos en la contraseña
const caracteres =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

// Mensajes de alerta
const MENSAJE_CARACTERES_INSUFICIENTES =
  "La cantidad de caracteres debe ser mayor a 8";
const MENSAJE_CONTRASENA_SEGURA = "Contraseña segura";
const MENSAJE_CONTRASENA_NO_SEGURA =
  "Contraseña no segura. Debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial";

// Función para generar una contraseña
function generarPassword(longitud) {
  let password = "";
  for (let i = 0; i < longitud; i++) {
    let caracterAleatorio =
      caracteres[Math.floor(Math.random() * caracteres.length)];
    password += caracterAleatorio;
  }
  return password;
}

// Función para validar la seguridad de una contraseña
function validarPassword(password) {
  return {
    tieneMayusculas: /[A-Z]/.test(password),
    tieneMinusculas: /[a-z]/.test(password),
    tieneNumeros: /[0-9]/.test(password),
    tieneCaracteresEspeciales: /[!@#$%^&*()]/.test(password),
  };
}

// Función para mostrar alertas usando SweetAlert2
function mostrarAlerta(mensaje, tipo) {
  Swal.fire({
    title: mensaje,
    icon: tipo,
    confirmButtonText: "OK",
  });
}

// Función que se ejecuta al hacer clic en el botón "Generar"
function generar() {
  let numeroDigitado = parseInt(cantidad.value);

  if (numeroDigitado < 8) {
    mostrarAlerta(MENSAJE_CARACTERES_INSUFICIENTES, "error");
    return;
  }

  let password = generarPassword(numeroDigitado);
  let validacion = validarPassword(password);

  if (
    validacion.tieneMayusculas &&
    validacion.tieneMinusculas &&
    validacion.tieneNumeros &&
    validacion.tieneCaracteresEspeciales
  ) {
    mostrarAlerta(MENSAJE_CONTRASENA_SEGURA, "success");
  } else {
    mostrarAlerta(MENSAJE_CONTRASENA_NO_SEGURA, "warning");
  }

  contrasena.value = password;
}

// Función para limpiar el campo de contraseña
function limpiarCampo() {
  contrasena.value = "";
}

// Asignar las funciones a los eventos 'click' de los botones
boton.addEventListener("click", generar);
botonLimpiar.addEventListener("click", limpiarCampo);
