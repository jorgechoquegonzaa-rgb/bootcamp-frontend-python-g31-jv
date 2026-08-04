//La siguiente linea imprime en la consola del navegador el texto ¡Hola Javascript!

console.log("¡Hola Javascript!");

//1.COMENTARIOS, Javascript ignora estsd lineas y sirve para explicar el condigo

//Esto es un comentario de una linea

/*
Esto es un comentario
de 
varias lineas
*/

//2.TIPOS DE DATOS

//Primitivos basicos:

//2.1 Number(numeros)

//Ejemplos: 123, 34 ,89, -67, 0

console.log(20);
console.log(typeof 20); //number
console.log(123);
console.log(typeof 123); //number
console.log(123);
console.log(34.89);
console.log(typeof 34.89); //number
console.log(123);
console.log(-67);
console.log(typeof -67); //number
console.log(123);
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);

//2.2. String (Texto)

console.log("Jorge");
console.log(typeof "Jorge"); //string
console.log("Bonifacio");
console.log(typeof "Bonifacio"); //string

//2.3. Boolean (Verdaderi o Falso)

console.log(true);
console.log(false);

//2.4. undefined, no tiene valor aún

let x; //Estoy declarando una variable
console.log(x);

//2.5. null, intencionalmente esta  vacio

let nombre = null;
console.log(nombre);

//ejercicio, verificar que tipo de datos devuelven las siguientes lineas

console.log(typeof 10); // Devuelve: "number"
console.log(typeof "hola"); // Devuelve: "string"
console.log(typeof true); // Devuelve: "boolean"
console.log(typeof undefined); // Devuelve: "undefined"
console.log(typeof null); // Devuelve: "object"

//3. Variables (Guardar datos)

//const. (Valores que no cambian durante la ejecucion)

const pi = 3.141599;

console.log(pi);

// pi = 4.98888 x - encaught Type error: Assignment to constant variable

//let (pueden cambiar los valores durante la ejecucion del programa)

let edad = 20;

console.log(edad);

edad = 25;

console.log(edad);

//4. Operaciones matematicos

console.log(1 + 3);
console.log(6 - 5);
console.log(2 * 8);
console.log(2 / 8);
console.log(10 / 2);
console.log(7 % 2);
console.log(3 ** 2); // Division
console.log(Math.pow(3, 2)); // Exponente

//Ejercicio: dadas dos variables, a con valor 10 y b con valor 3. Realiza una operación que permita obtener el residuo de la división entre a y b. Luego muestra el resultado en consola.

const a = 10;
const b = 3;

const residuo = a % b;

console.log(residuo); //1

// 5. Comparaciones

// Igualdad debil ==

console.log(1 == "1"); // true (solo compara sus valores)

//Igualdad estricta == (RECOMENDACION: Usar siempre

console.log(1 == "1"); // false (compara el valor y el tipo de dato)

// 6. operadores logicos (AND, OR, NEGACION)

console.log(true && false); //nose cumple sera
console.log(true || false); // true
console.log(!true); // false

//EJERCICIO:

//1.Imprimir las variables para hallar el area de un triángulo. Base = 10, Altura = 5. Imprimir el resultado en la consola.

const base = 10;
const altura = 5;
console.log((base * altura) / 2); // 25

// 7. Concatenacion (unir textos )
let nombre2 = "Jorge";
let edad2 = "42";

console.log("Hola" + nombre2); //Holajorge
console.log("Hola" + nombre2); //Hola jorge
console.log("Hola" + nombre2 + ", tienes" + edad2 + "años"); //Hola jorge tienes 42 años

// Mejor forma de concatenar (template strings) - backtick (alt gr + })
console.log(`Hola ${nombre2}, tienes ${edad2} años.`); // Hola Victor, tienes 39 años.

// 8. Condicionales (if)

let numero = 4;
if (numero % 2 == 0) {
  //Si es verdadera ka condicion se ejecuta el bloque entre las llaves
  console.log("Es par");
}

let nota = 18;

if (nota >= 13) {
  console.log("Aprobado");
} else {
  console.log("desabrobado");
}

let heroe = "Spiderman";

if (heroe === "Batman") {
  console.log("Hola soy Bruce");
} else if (heroe === "Spidermana") {
  console.log("Hola soy Peter");
} else if (heroe === "Iroman") {
  console.log("Hola soy tony");
} else {
  console.log("No soy un heroe 😄");
}

//=====TODO: Investiguen la estructura switch=========
let mes = "Enero";

switch (mes) {
  case "Enero":
  case "Febrero":
  case "Marzo":
    console.log("Estación: Verano ☀️ (en Perú)");
    break;
  case "Abril":
  case "Mayo":
  case "Junio":
    console.log("Estación: Otoño 🍂");
    break;
  case "Julio":
  case "Agosto":
  case "Setiembre":
    console.log("Estación: Invierno ❄️");
    break;
  case "Octubre":
  case "Noviembre":
  case "Diciembre":
    console.log("Estación: Primavera 🌸");
    break;
  default:
    console.log("Mes no válido");
}
// Resultado: "Estación: Verano ☀️ (en Perú)"

//9. ESTRUCTURA REPETITIVAS (FOR, WHILE, DO WHILE)

//for (Sirve para repartir una o varias instrucciones)

//Ejercicio: imprimir en consola los numeros del 0 al 9

// console.log (0)
// console.log (1)
// console.log (2)
// console.log (3)
// console.log (4)
// console.log (5)
// console.log (6)
// console.log (7)
// console.log (8)
// console.log (9)

for (let i = 0; i < 10; i++) {
  console.log(i);
}

//while

let j = 0;

while (j < 10) {
  console.log("while", j);

  j++;
}

// do while

// TODO:  Investiguen la diferencia con while

//EJERCICIOS

// 2. Dado un número, mostrar "par y mayor a 10", "par y menor o igual a 10", "Impar"

// Usando if/else anidados
if (numero % 2 === 0) {
  // Es par
  if (numero > 10) {
    console.log("Par y mayor a 10");
  } else {
    console.log("Par y menor o igual a 10");
  }
} else {
  // Es impar
  console.log("Impar");
}

// 3. Dado un número entero, escribe un programa que:
// - Muestre "fizzbuzz" si el número es divisible entre 3 y 5.
// - Muestre "fizz" si el número es divisible solo entre 3.
// - Muestre "buzz" si el número es divisible solo entre 5.
// - En cualquier otro caso, debe mostrar el mismo número.

// SOLUCIÓN 1:
console.log("--- Pruebas FizzBuzz ---");
let numerosTest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 30];

numerosTest.forEach((num) => {
  let resultadoTest;
  if (num % 3 === 0 && num % 5 === 0) {
    resultadoTest = "fizzbuzz";
  } else if (num % 3 === 0) {
    resultadoTest = "fizz";
  } else if (num % 5 === 0) {
    resultadoTest = "buzz";
  } else {
    resultadoTest = num;
  }
  console.log(`Número ${num}: ${resultadoTest}`);
});

// 10. Función

// Una función es un bloque de código reutilizable que hace una tarea

// ENTRADA -> [LÓGICA] -> SALIDA CON EL RESULTADO

// Función básica

function saludar() {
  console.log("Hola funciones!");
}

saludar(); // Ejecutar la función
saludar(); // Ejecutar la función
saludar(); // Ejecutar la función

//Funciones con Parametros

function saludoConNombre(nombre) {
  console.log("Hola " + nombre);
}

saludoConNombre("Jorge");
saludoConNombre();

//Funciones que retornan valores

function sumar(a, b) {
  const sima = a + b;

  return sumar; // Devuelve solo el resultado de lo que se opere
}

console.log(sumar(2, 3));

//EJERCICIO

function esPar(numero) {
  return numero % 2 === 0; // Boolean
}

console.log(esPar(4)); //true
console.log(esPar(7)); // false

// Ejercicios

// 1. Crear una función que reciba un número y devuelva el doble de ese número por consola
// 2. Crear una función que reciba dos números y devuelva el mayor por consola
// 3. Reutilizar el ejercicio de fizzBuzz usando funciones de tal forma que puedan llamarlo de la siguiente manera. Ej. fizzBuzz(15) -> fizzbuzz

//console.log("=== EJERCICIO 1: DOBLE ===");
function doble(numero) {
  console.log(doble(5)); // 10
  console.log(doble(12)); // 24

  //console.log("=== EJERCICIO 2: MAYOR ===");
  console.log(mayor(8, 3)); // 8
  console.log(mayor(5, 10)); // 10
  console.log(mayor(7, 7)); // 7

  //console.log("=== EJERCICIO 3: FIZZBUZZ ===");
  console.log(fizzBuzz(15)); // fizzbuzz
  console.log(fizzBuzz(3)); // fizz
  console.log(fizzBuzz(5)); // buzz
  console.log(fizzBuzz(7)); // 7

  function doble(numero) {
    return numero * 2;
  }

  console.log(doble(8));
  console.log(doble(3));
}

// 11. Cadena de texto

// Propiedad .length

console.log("Hola".length); // 4

// Acceder a caracteres, cada letra tiene una posición (empieza con 0)

let miNombre = "Jorge";

console.log(miNombre[0]); // V
console.log(miNombre[1]); // i
console.log(miNombre[2]); // c

// Métodos importantes de las cadenas de texto

console.log(miNombre.toLowerCase()); // victor
console.log(miNombre.toUpperCase()); // VICTOR
console.log(miNombre.includes("ct")); // true

// EJERCICIOS:

// 1. Dado un string, crear una función llamada evaluarTexto que devuelva: "Largo" si tiene más de 10 caracteres y "Corto" si tiene 10 o menos.
// 2. Dado un string, crear una función llamada invertirTexto que devuelve el texto invertido. Ej. hola -> aloh

// 1.
function evaluarTexto(texto) {
  if (texto.length > 10) {
    return "Largo";
  } else {
    return "Corto";
  }
}

// Probando la función
console.log(evaluarTexto("Hola")); // "Corto" (4 caracteres)
console.log(evaluarTexto("JavaScript")); // "Corto" (10 caracteres)
console.log(evaluarTexto("Programación")); // "Largo" (12 caracteres)

//2.
function invertirTexto(texto) {
  // Paso 1: Convertir el texto en un array de caracteres
  // Paso 2: Invertir el array con reverse()
  // Paso 3: Unir los caracteres nuevamente con join()
  return texto.split("").reverse().join("");
}

// Probando la función
console.log(invertirTexto("hola")); // "aloh"
console.log(invertirTexto("JavaScript")); // "tpircSavaJ"
console.log(invertirTexto("12345")); // "54321"
