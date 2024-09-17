// Obtener las referencias a los elementos del DOM
let cantidad = document.getElementById("cantidad"); // Campo de entrada donde el usuario ingresa la cantidad de caracteres
let boton = document.getElementById("generar"); // Botón que el usuario presiona para generar la contraseña
let contrasena = document.getElementById("contrasena"); // Campo de texto donde se mostrará la contraseña generada

// Definimos los caracteres permitidos en la contraseña
const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"; // Se agregan caracteres especiales !@#$%^&*()  desafio 1 Christian Velasco

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
    let caracterAleatorio = caracteres[Math.floor(Math.random() * caracteres.length)];
    // Añadir el carácter aleatorio a la contraseña
    password += caracterAleatorio;
  }

  // Asignar la contraseña generada al campo de texto para mostrarla al usuario
  contrasena.value = password;
}

// Asignar la función generar al evento 'click' del botón
boton.addEventListener("click", generar);

  // Pendientes de mejora :  
  
// Desafio 1 Christian Velasco agregar caracteres especiales !@#$%^&*() - ok
// Desafio 2 Leo Castillo . agregar un boton limpiar campo contraseña
// Desafio 3 Jeanmarie Quijada  agregar alert con mensajes de validacion del tipo de contraseña minimo mayusculas, minusculas, numeros y caracteres especiales

