// Obtener las referencias a los elementos del DOM
const cantidad = document.getElementById("cantidad");
const boton = document.getElementById("generar");
const contrasena = document.getElementById("contrasena");
const botonLimpiar = document.getElementById("limpiar");

// Definimos los caracteres permitidos en la contraseña
const caracteres = {
  mayusculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  minusculas: "abcdefghijklmnopqrstuvwxyz",
  numeros: "0123456789",
  especiales: "!@#$%^&*()",
};

// Mensajes de alerta
const MENSAJE_CARACTERES_INSUFICIENTES =
  "La cantidad de caracteres debe ser mayor a 8";
const MENSAJE_CANTIDAD_INVALIDA = "Por favor, ingrese un número válido";
const MENSAJE_CONTRASENA_SEGURA = "Contraseña segura";
const MENSAJE_CONTRASENA_NO_SEGURA =
  "Contraseña no segura. Debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial";
const MENSAJE_CONTRASENA_COPIADA = "Contraseña copiada al portapapeles";

// Función para generar una contraseña segura
const generarPassword = (longitud) => {
  const todasLasCategorias = Object.values(caracteres).join("");
  let password = [
    caracteres.mayusculas[
      Math.floor(Math.random() * caracteres.mayusculas.length)
    ],
    caracteres.minusculas[
      Math.floor(Math.random() * caracteres.minusculas.length)
    ],
    caracteres.numeros[Math.floor(Math.random() * caracteres.numeros.length)],
    caracteres.especiales[
      Math.floor(Math.random() * caracteres.especiales.length)
    ],
  ];

  for (let i = password.length; i < longitud; i++) {
    password.push(
      todasLasCategorias[Math.floor(Math.random() * todasLasCategorias.length)]
    );
  }

  return password.sort(() => Math.random() - 0.5).join("");
};

// Función para validar la seguridad de una contraseña
const validarPassword = (password) => ({
  tieneMayusculas: /[A-Z]/.test(password),
  tieneMinusculas: /[a-z]/.test(password),
  tieneNumeros: /[0-9]/.test(password),
  tieneCaracteresEspeciales: /[!@#$%^&*()]/.test(password),
});

// Función para mostrar alertas usando SweetAlert2
const mostrarAlerta = (mensaje, tipo) =>
  Swal.fire({
    title: mensaje,
    icon: tipo,
    confirmButtonText: "OK",
    background: "#041832",
    color: "#FFF",
    confirmButtonColor: "#1875E8",
    position: "top-end", // Posición fija en la esquina superior derecha
    toast: true, // Estilo de notificación tipo toast
    timer: 3000, // Duración de la alerta
    timerProgressBar: true,
    showConfirmButton: false,
    customClass: {
      popup: "animated fadeInDown",
    },
  });

// Función para generar y validar la contraseña
const generarYValidarPassword = () => {
  const numeroDigitado = parseInt(cantidad.value);
  if (isNaN(numeroDigitado))
    return mostrarAlerta(MENSAJE_CANTIDAD_INVALIDA, "error");
  if (numeroDigitado < 8)
    return mostrarAlerta(MENSAJE_CARACTERES_INSUFICIENTES, "error");

  const password = generarPassword(numeroDigitado);
  const {
    tieneMayusculas,
    tieneMinusculas,
    tieneNumeros,
    tieneCaracteresEspeciales,
  } = validarPassword(password);

  mostrarAlerta(
    tieneMayusculas &&
      tieneMinusculas &&
      tieneNumeros &&
      tieneCaracteresEspeciales
      ? MENSAJE_CONTRASENA_SEGURA
      : MENSAJE_CONTRASENA_NO_SEGURA,
    tieneMayusculas &&
      tieneMinusculas &&
      tieneNumeros &&
      tieneCaracteresEspeciales
      ? "success"
      : "warning"
  );

  contrasena.value = password;
  boton.textContent = "Copiar";
  boton.removeEventListener("click", generarYValidarPassword);
  boton.addEventListener("click", copiarContrasena);
};

// Función para limpiar el campo de contraseña
const limpiarCampo = () => {
  contrasena.value = "";
  cantidad.value = "";
  boton.textContent = "Generar";
  boton.removeEventListener("click", copiarContrasena);
  boton.addEventListener("click", generarYValidarPassword);
};

// Función para copiar la contraseña al portapapeles
const copiarContrasena = () => {
  if (contrasena.value) {
    navigator.clipboard.writeText(contrasena.value).then(() => {
      mostrarAlerta(MENSAJE_CONTRASENA_COPIADA, "success");
      limpiarCampo();
    });
  }
};

// Función para inicializar los eventos
const inicializarEventos = () => {
  boton.addEventListener("click", generarYValidarPassword);
  botonLimpiar.addEventListener("click", limpiarCampo);
};

// Inicializar eventos y mostrar mensaje de bienvenida
document.addEventListener("DOMContentLoaded", () => {
  inicializarEventos();
  mostrarAlerta("Bienvenido!", "info");
});
