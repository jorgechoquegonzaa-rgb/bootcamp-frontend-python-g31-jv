//console.log("Hola JS")

//TIPOS DE DATOS PRIMITIVOS (Number, String, Booleab, null, underfined, BigInt, Symbol)

//TIPOS DE DATOS NO RPIMITIVOS /Arrays(Arreglos), Objest(Objetos), Fuction, etc

//ARRAYS

//Un arreglo puede contener elementos de cualquier tipo: cadena, numeros, booleans, null, arrays, objetos, etc)

//DECLARACION

const arregloVacio = []
const listaDeNumeros = [25, 36, 89, -99, 15.60]
const listaDeValores = [1, 2, 3, 'Jorge', 'Bonifacio', 'Código', true, null, undefined]

console.log(arregloVacio)
console.log(listaDeNumeros)
console.log(listaDeValores)

// Lectura de los elementos de un arreglo

console.log(listaDeValores[0]) // 1
console.log(listaDeValores[3]) // Jorge
console.log(listaDeValores[3] + ' ' + listaDeValores[4]) // JorgeBonifacio
console.log(listaDeValores[5]) // Código
console.log(listaDeValores[99]) // undefined

// Escritura en un arreglo

listaDeValores[3] = 'Jhoel'
listaDeValores[7] = 1689

console.log(listaDeValores)

Object.freeze(listaDeValores)
listaDeValores[8] = 'Hola a todos'
console.log(listaDeValores)
