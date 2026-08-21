// ECMASCRIPT -> Estándar que define cómo debe funciona JS
// Chrome, MS Edge, Brave, etc -> V8
// Firefox -> SpiderMonkey
// Safiri -> JavaScriptCore

// Versiones importantes ECMAScript
// Cada nueva versión agrega características al lenguaje
// ES5 (2009)
// ES6 (2015) -> Se hicieron actualizacione importantes.
// * Apareció let y const en lugar var,
// * arrow functions,
// * clases,
// * template strings,
// * destructuring,
// * promises, etc.

// Funciones por declaración
// Funciones sin parámetros

function nombreDeLaFUncion() {
  console.log("Hola a todos G31!");
}

nombreDeLaFUncion();

// Funciones con parámetros por defecto con retorno y en múltiples líneas

function calcularSiEsMayorDe18(edad = 1) {
  console.log(edad); // undefined si no pasamos el parámetro
  console.log(undefined > 18); // false
  if (edad > 18) {
    return "Es mayor de edad";
  } else {
    return "Es menor de edad";
  }
}

console.log(calcularSiEsMayorDe18());
console.log(calcularSiEsMayorDe18(25));

// ARROW FUNCTIONS (Funciones flecha) =>

// Funciones sin parámetros en una línea

// function imprimiendoSaludo1() {
//   console.log('Hola a todos nuevemente - sin arrow functions')
// }

// imprimiendoSaludo1()

const imprimiendoSaludo2 = () => console.log("Hola a todos nuevamente");

imprimiendoSaludo2();

// Funciones con parámetros en un línea
const suma = (numero1, numero2) => numero1 + numero2;

// function suma(numero1, numero2) {
//   return numero1 + numero2
// }

console.log(suma(5, 2)); // 7

// Arrow functions con parámetros por defecto con retorno y en múltiples líneas

const saludoEnMayusculas = (nombre = "Anónimo") => {
  const nombreEnMayusculas = nombre.toUpperCase();

  return "¡Hola " + nombreEnMayusculas + "!";
};

console.log(saludoEnMayusculas());
console.log(saludoEnMayusculas("Luizz"));

//PARAMETROS REST (operador rest -> ...)
//permiten que la funcion reciba una cantidad indefinida de argumentos y los agrupa dentro de un array

const numeros = [4, 5]

const miSuma = (n1, n2) => n1 + n2

console.log(miSuma(6, 7)) //13
console.log(miSuma(...numeros)) //9

const listaDeNumeros = [6, 33, 1, -66, 998, 453]

console.log(Math.max(25,8,9,54))
console.log(Math.max(... listaDeNumeros))

const misuma2 = (...numeros) => {
  console.log(numeros)
  //returm reduce(...)
}
misuma2(1, 2, 3, 4, 5, 6)

//SPREAS OPERATOR (...)
//Sirve para exapndir un arreglo, e incluso objetos

const frutas = ['manzanas', 'naranjas', 'sandias']

const verduras = ['papas', 'cebollas']

console.log(frutas.concat(verduras))

const frutasYVerduras = [...frutas, ...verduras]

console.log(frutasYVerduras) //['manzanas', 'naranjas', 'sandias', 'papas', 'cebollas']

const persona = {
  nombre: 'Jorge',
  edad: 40,
  color: 'azul'
}

const stack = {
  javascript : 'React.js',
  python: 'Flask',
  nodejs: 'Express.js',
}

console.log({ ...persona, ...stack})

console.log({ persona, stack})


