const formulario = document.getElementById("imcForm");

const pesoInput = document.getElementById("peso");
const alturaInput = document.getElementById("altura");

const resultadoContainer = document.getElementById("resultadoContainer");
const imcMensaje = document.getElementById("imcMensaje");
const imcValor = document.getElementById("imcValor");
const imcDetalle = document.getElementById("imcDetalle");


formulario.addEventListener("submit", function (event) {

  // Evita que el formulario recargue la página
  event.preventDefault();

  // Obtener los valores
  const peso = parseFloat(pesoInput.value);
  const alturaCm = parseFloat(alturaInput.value);

  // Convertir centímetros a metros
  const alturaMetros = alturaCm / 100;

  // Calcular IMC
  const imc = peso / (alturaMetros * alturaMetros);

  // Mostrar resultado
  imcValor.textContent = imc.toFixed(2);

  // Determinar categoría
  if (imc < 18.5) {

    imcMensaje.textContent =
      "Tu Índice de Masa Corporal es BAJO";

    imcDetalle.textContent =
      "Tu IMC es menor de 18.5";

  } else if (imc < 25) {

    imcMensaje.textContent =
      "Tu Índice de Masa Corporal es NORMAL";

    imcDetalle.textContent =
      "Tu IMC está entre 18.5 y 24.9";

  } else if (imc < 30) {

    imcMensaje.textContent =
      "Tu Índice de Masa Corporal indica SOBREPESO";

    imcDetalle.textContent =
      "Tu IMC está entre 25 y 29.9";

  } else {

    imcMensaje.textContent =
      "Tu Índice de Masa Corporal indica OBESIDAD";

    imcDetalle.textContent =
      "Tu IMC es mayor o igual a 30";

  }

  // Mostrar la caja de resultado
  resultadoContainer.classList.remove("hidden");
  
});

