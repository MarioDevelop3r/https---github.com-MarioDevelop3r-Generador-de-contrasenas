// Obtener las referencias a los elementos del DOM
let cantidad = document.getElementById("cantidad"); // Campo de entrada donde el usuario ingresa la cantidad de caracteres
let boton = document.getElementById("generar"); // Botón que el usuario presiona para generar la contraseña
let contrasena = document.getElementById("contrasena"); // Campo de texto donde se mostrará la contraseña generada
let botonLimpiar = document.getElementById("limpiar"); // Botón que el usuario presiona para limpiar el campo de contraseña

// Definimos los caracteres permitidos en la contraseña
const caracteres =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"; // Se agregan caracteres especiales !@#$%^&*()  desafio 1 Christian Velasco

// Función que se ejecuta al hacer clic en el botón "Generar"
function generar() {
  // Convertir el valor ingresado en el campo de cantidad a un número entero
  let numeroDigitado = parseInt(cantidad.value);

  // Verificar si el número de caracteres es menor a 8
  if (numeroDigitado < 8) {
    alert("La cantidad de caracteres debe ser mayor a 8"); // Mostrar una alerta si es menor a 8
    return; // Salir de la función si no se cumple la condición
  }

  // Inicializar la variable para almacenar la contraseña generada
  let password = "";

  // Bucle para generar cada carácter de la contraseña
  for (let i = 0; i < numeroDigitado; i++) {
    // Generar un carácter aleatorio de la lista de caracteres permitidos
    let caracterAleatorio =
      caracteres[Math.floor(Math.random() * caracteres.length)];
    // Añadir el carácter aleatorio a la contraseña
    password += caracterAleatorio;
  }

  // validacion de la seguridad de la contraseña
  let tieneMayusculas = /[A-Z]/.test(password);
  let tieneMinusculas = /[a-z]/.test(password);
  let tieneNumeros = /[0-9]/.test(password);
  let tieneCaracteresEspeciales = /[!@#$%^&*()]/.test(password);

  if (
    tieneMayusculas &&
    tieneMinusculas &&
    tieneNumeros &&
    tieneCaracteresEspeciales
  ) {
    alert("Contraseña segura");
  } else {
    alert(
      "Contaseña no segura dece debe incluir al memos una mayuscula, una minuscula, un numero y un caracter especial"
    );
  }

  // Asignar la contraseña generada al campo de texto para mostrarla al usuario
  contrasena.value = password;
}

// Funcion para limpiar el campo de contraseña
function limpiarCampo() {
  contrasena.value = "";
}

// Asignar la función generar al evento 'click' del botón
boton.addEventListener("click", generar);
botonLimpiar.addEventListener("click", limpiarCampo); // Desafio 2 Leo Castillo . agregar un boton limpiar campo contraseña

// Pendientes de mejora :

// Desafio 1 Christian Velasco agregar caracteres especiales !@#$%^&*() - ok
// Desafio 2 Leo Castillo . agregar un boton limpiar campo contraseña - ok
// Desafio 3 Jeanmarie Quijada  agregar alert con mensajes de validacion del tipo de contraseña minimo mayusculas, minusculas, numeros y caracteres especiales y debe mostrar mensaje de contraseña segura o no segura -ok
