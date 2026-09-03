// ============================================================
// DRAGON BALL CRUD
// Semana 08 - JavaScript, DOM y Asincronía
//
// APIBox = almacenamiento principal del CRUD
// Dragon Ball API = respaldo para obtener imágenes reales
// ============================================================

const API_URL =
  "https://apibox.vercel.app/YXyfxSNN9Z1CBUusBSs2w9XgnAdvw2jZ/api/dragonball";

const DRAGONBALL_API =
  "https://dragonball-api.com/api/characters";

const POR_PAGINA = 5;

let personajes = [];
let paginaActual = 1;

// ============================================================
// ELEMENTOS DEL DOM
// ============================================================

const form = document.getElementById("formPersonaje");

const personajeId = document.getElementById("personajeId");

const nombre = document.getElementById("nombre");
const imagen = document.getElementById("imagen");
const raza = document.getElementById("raza");
const genero = document.getElementById("genero");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

const lista = document.getElementById("lista");
const contador = document.getElementById("contador");

const loading = document.getElementById("loading");
const vacio = document.getElementById("vacio");

const paginacion = document.getElementById("paginacion");
const numerosPagina = document.getElementById("numerosPagina");

const mensaje = document.getElementById("mensaje");

const btnPrimera = document.getElementById("btnPrimera");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnUltima = document.getElementById("btnUltima");

// ============================================================
// INICIAR
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  cargarPersonajes();
});

// ============================================================
// GET - LISTAR PERSONAJES DESDE APIBox
// ============================================================

async function cargarPersonajes() {

  mostrarLoading(true);

  try {

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    // APIBox normalmente devuelve un arreglo.
    if (Array.isArray(data)) {
      personajes = data;
    }

    // Compatibilidad por si la API devuelve items.
    else if (Array.isArray(data.items)) {
      personajes = data.items;
    }

    // Compatibilidad por si devuelve data.
    else if (Array.isArray(data.data)) {
      personajes = data.data;
    }

    else {
      personajes = [];
    }

    paginaActual = 1;

    renderizar();

  } catch (error) {

    console.error("Error al cargar personajes:", error);

    lista.innerHTML = "";

    vacio.classList.remove("hidden");

    vacio.innerHTML = `
      <strong>⚠️ No se pudieron cargar los personajes</strong>
      <span>
        Verifica tu conexión y que APIBox esté disponible.
      </span>
    `;

    paginacion.classList.add("hidden");

    mostrarError(
      "No se pudieron cargar los personajes desde APIBox."
    );

  } finally {

    mostrarLoading(false);
  }
}

// ============================================================
// RENDERIZAR PERSONAJES
// ============================================================

function renderizar() {

  contador.textContent = personajes.length;

  lista.innerHTML = "";

  if (personajes.length === 0) {

    vacio.classList.remove("hidden");

    paginacion.classList.add("hidden");

    return;
  }

  vacio.classList.add("hidden");

  const totalPaginas =
    Math.ceil(personajes.length / POR_PAGINA);

  if (paginaActual > totalPaginas) {
    paginaActual = totalPaginas;
  }

  const inicio =
    (paginaActual - 1) * POR_PAGINA;

  const personajesPagina =
    personajes.slice(
      inicio,
      inicio + POR_PAGINA
    );

  personajesPagina.forEach((personaje) => {

    lista.appendChild(
      crearTarjeta(personaje)
    );

  });

  actualizarPaginacion(totalPaginas);
}

// ============================================================
// CREAR TARJETA
// ============================================================

function crearTarjeta(personaje) {

  const li = document.createElement("li");

  li.className = "personaje-card";

  const id = personaje.id;

  const nom =
    personaje.name || "Sin nombre";

  const race =
    personaje.race || "Desconocida";

  const gender =
    personaje.gender || "";

  const url =
    typeof personaje.image === "string"
      ? personaje.image.trim()
      : "";

  // ==========================================================
  // IMAGEN
  // ==========================================================

  if (url) {

    const img = document.createElement("img");

    img.className = "personaje-img";

    img.src = url;

    img.alt = nom;

    img.loading = "lazy";

    const placeholder =
      document.createElement("div");

    placeholder.className =
      "personaje-placeholder hidden";

    placeholder.textContent = "DB";

    li.appendChild(img);

    li.appendChild(placeholder);

    // --------------------------------------------------------
    // SI LA IMAGEN DE APIBox FALLA
    // BUSCAR IMAGEN REAL EN DRAGON BALL API
    // --------------------------------------------------------

    img.addEventListener("error", async () => {

      img.style.display = "none";

      const imagenReal =
        await obtenerImagenDragonBall(nom);

      if (imagenReal) {

        img.src = imagenReal;

        img.style.display = "block";

        placeholder.classList.add("hidden");

      } else {

        placeholder.classList.remove("hidden");
      }

    });

  } else {

    const placeholder =
      document.createElement("div");

    placeholder.className =
      "personaje-placeholder";

    placeholder.textContent = "DB";

    li.appendChild(placeholder);
  }

  // ==========================================================
  // INFORMACIÓN
  // ==========================================================

  const datos =
    document.createElement("div");

  datos.className = "personaje-info";

  const titulo =
    document.createElement("h3");

  titulo.textContent = nom;

  const badges =
    document.createElement("div");

  badges.className = "badges";

  // RAZA

  const badgeRaza =
    document.createElement("span");

  badgeRaza.className =
    "badge badge-raza";

  badgeRaza.textContent = race;

  badges.appendChild(badgeRaza);

  // GÉNERO

  if (gender) {

    const badgeGenero =
      document.createElement("span");

    badgeGenero.className =
      "badge";

    if (gender === "Female") {

      badgeGenero.classList.add(
        "badge-female"
      );

    } else {

      badgeGenero.classList.add(
        "badge-genero"
      );
    }

    badgeGenero.textContent = gender;

    badges.appendChild(badgeGenero);
  }

  datos.appendChild(titulo);

  datos.appendChild(badges);

  li.appendChild(datos);

  // ==========================================================
  // BOTONES
  // ==========================================================

  const acciones =
    document.createElement("div");

  acciones.className = "acciones";

  // EDITAR

  const btnEditar =
    document.createElement("button");

  btnEditar.type = "button";

  btnEditar.className =
    "btn-accion btn-editar";

  btnEditar.innerHTML =
    "✎ &nbsp;Editar";

  btnEditar.addEventListener(
    "click",
    () => editarPersonaje(id)
  );

  // ELIMINAR

  const btnEliminar =
    document.createElement("button");

  btnEliminar.type = "button";

  btnEliminar.className =
    "btn-accion btn-eliminar";

  btnEliminar.innerHTML =
    "♜ &nbsp;Eliminar";

  btnEliminar.addEventListener(
    "click",
    () => eliminarPersonaje(id)
  );

  acciones.appendChild(btnEditar);

  acciones.appendChild(btnEliminar);

  li.appendChild(acciones);

  return li;
}

// ============================================================
// OBTENER IMAGEN REAL DESDE DRAGON BALL API
// ============================================================

async function obtenerImagenDragonBall(nombrePersonaje) {

  try {

    const url =
      `${DRAGONBALL_API}?name=${encodeURIComponent(
        nombrePersonaje
      )}`;

    const response =
      await fetch(url);

    if (!response.ok) {
      return null;
    }

    const data =
      await response.json();

    // Dependiendo de la respuesta,
    // puede venir en items, characters o como arreglo.

    let resultados = [];

    if (Array.isArray(data)) {

      resultados = data;

    } else if (Array.isArray(data.items)) {

      resultados = data.items;

    } else if (Array.isArray(data.characters)) {

      resultados = data.characters;

    }

    // Buscar coincidencia exacta.

    const personajeEncontrado =
      resultados.find(
        (personaje) =>
          personaje.name?.toLowerCase() ===
          nombrePersonaje.toLowerCase()
      );

    if (
      personajeEncontrado &&
      personajeEncontrado.image
    ) {

      return personajeEncontrado.image;
    }

    // Si no hay coincidencia exacta,
    // usar el primer resultado.

    if (
      resultados.length > 0 &&
      resultados[0].image
    ) {

      return resultados[0].image;
    }

    return null;

  } catch (error) {

    console.warn(
      "No se pudo obtener imagen alternativa:",
      error
    );

    return null;
  }
}

// ============================================================
// POST - CREAR PERSONAJE
// ============================================================

async function guardarPersonaje(event) {

  event.preventDefault();

  const datos = {

    name: nombre.value.trim(),

    image: imagen.value.trim(),

    race: raza.value.trim()
  };

  // Género opcional

  if (genero.value) {

    datos.gender =
      genero.value;
  }

  // Validación

  if (
    !datos.name ||
    !datos.image ||
    !datos.race
  ) {

    mostrarError(
      "Nombre, Imagen y Raza son obligatorios."
    );

    return;
  }

  const id =
    personajeId.value.trim();

  const edicion =
    Boolean(id);

  submitBtn.disabled = true;

  submitBtn.textContent =
    edicion
      ? "Actualizando..."
      : "Agregando...";

  try {

    const response = await fetch(

      edicion
        ? `${API_URL}/${encodeURIComponent(id)}`
        : API_URL,

      {

        method:
          edicion
            ? "PUT"
            : "POST",

        headers: {

          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify(datos)
      }
    );

    if (!response.ok) {

      throw new Error(
        `HTTP ${response.status}`
      );
    }

    mostrarOk(

      edicion
        ? "Personaje actualizado correctamente."
        : "Personaje agregado correctamente."
    );

    limpiarFormulario();

    await cargarPersonajes();

  } catch (error) {

    console.error(error);

    mostrarError(
      "No se pudo guardar el personaje en APIBox."
    );

  } finally {

    submitBtn.disabled = false;

    submitBtn.innerHTML =
      "＋ &nbsp;Agregar Personaje";
  }
}

// ============================================================
// EDITAR PERSONAJE
// ============================================================

async function editarPersonaje(id) {

  try {

    const response =
      await fetch(
        `${API_URL}/${encodeURIComponent(id)}`
      );

    if (!response.ok) {

      throw new Error(
        `HTTP ${response.status}`
      );
    }

    const personaje =
      await response.json();

    personajeId.value =
      personaje.id || id;

    nombre.value =
      personaje.name || "";

    imagen.value =
      personaje.image || "";

    raza.value =
      personaje.race || "";

    genero.value =
      personaje.gender || "";

    submitBtn.innerHTML =
      "✎ &nbsp;Actualizar Personaje";

    cancelBtn.classList.remove(
      "hidden"
    );

    window.scrollTo({

      top: 0,

      behavior: "smooth"
    });

    nombre.focus();

  } catch (error) {

    console.error(error);

    mostrarError(
      "No se pudo obtener el personaje para editar."
    );
  }
}

// ============================================================
// PUT - ACTUALIZAR
// ============================================================

async function actualizarPersonaje(
  id,
  datos
) {

  const response =
    await fetch(
      `${API_URL}/${encodeURIComponent(id)}`,
      {

        method: "PUT",

        headers: {

          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify(datos)
      }
    );

  if (!response.ok) {

    throw new Error(
      `HTTP ${response.status}`
    );
  }

  return response.json();
}

// ============================================================
// DELETE - ELIMINAR
// ============================================================

async function eliminarPersonaje(id) {

  const personaje =
    personajes.find(
      (p) =>
        String(p.id) ===
        String(id)
    );

  const nombreConfirmacion =
    personaje?.name ||
    "este personaje";

  const confirmar =
    confirm(
      `¿Deseas eliminar a ${nombreConfirmacion}?`
    );

  if (!confirmar) {
    return;
  }

  try {

    const response =
      await fetch(
        `${API_URL}/${encodeURIComponent(id)}`,
        {
          method: "DELETE"
        }
      );

    if (!response.ok) {

      throw new Error(
        `HTTP ${response.status}`
      );
    }

    mostrarOk(
      "Personaje eliminado correctamente."
    );

    await cargarPersonajes();

  } catch (error) {

    console.error(error);

    mostrarError(
      "No se pudo eliminar el personaje."
    );
  }
}

// ============================================================
// CANCELAR EDICIÓN
// ============================================================

cancelBtn.addEventListener(
  "click",
  limpiarFormulario
);

function limpiarFormulario() {

  form.reset();

  personajeId.value = "";

  submitBtn.innerHTML =
    "＋ &nbsp;Agregar Personaje";

  cancelBtn.classList.add(
    "hidden"
  );
}

// ============================================================
// PAGINACIÓN
// ============================================================

function actualizarPaginacion(
  totalPaginas
) {

  if (totalPaginas <= 1) {

    paginacion.classList.add(
      "hidden"
    );

    return;
  }

  paginacion.classList.remove(
    "hidden"
  );

  btnPrimera.disabled =
    paginaActual === 1;

  btnAnterior.disabled =
    paginaActual === 1;

  btnSiguiente.disabled =
    paginaActual === totalPaginas;

  btnUltima.disabled =
    paginaActual === totalPaginas;

  numerosPagina.innerHTML = "";

  for (
    let i = 1;
    i <= totalPaginas;
    i++
  ) {

    const boton =
      document.createElement("button");

    boton.type = "button";

    boton.textContent = i;

    if (
      i === paginaActual
    ) {

      boton.classList.add(
        "activo"
      );
    }

    boton.addEventListener(
      "click",
      () => {

        paginaActual = i;

        renderizar();
      }
    );

    numerosPagina.appendChild(
      boton
    );
  }
}

// ============================================================
// BOTONES DE PAGINACIÓN
// ============================================================

btnPrimera.addEventListener(
  "click",
  () => {

    paginaActual = 1;

    renderizar();
  }
);

btnAnterior.addEventListener(
  "click",
  () => {

    if (paginaActual > 1) {

      paginaActual--;

      renderizar();
    }
  }
);

btnSiguiente.addEventListener(
  "click",
  () => {

    const total =
      Math.ceil(
        personajes.length /
        POR_PAGINA
      );

    if (
      paginaActual < total
    ) {

      paginaActual++;

      renderizar();
    }
  }
);

btnUltima.addEventListener(
  "click",
  () => {

    paginaActual =
      Math.ceil(
        personajes.length /
        POR_PAGINA
      );

    renderizar();
  }
);

// ============================================================
// ESTADO DE CARGA
// ============================================================

function mostrarLoading(estado) {

  loading.classList.toggle(
    "hidden",
    !estado
  );

  if (estado) {

    lista.innerHTML = "";

    vacio.classList.add(
      "hidden"
    );

    paginacion.classList.add(
      "hidden"
    );
  }
}

// ============================================================
// MENSAJES
// ============================================================

let timerMensaje;

function mostrarOk(texto) {

  mensaje.className =
    "mensaje ok";

  mensaje.textContent =
    "✓ " + texto;

  clearTimeout(
    timerMensaje
  );

  timerMensaje =
    setTimeout(
      () => {

        mensaje.classList.add(
          "hidden"
        );

      },
      3000
    );
}

function mostrarError(texto) {

  mensaje.className =
    "mensaje error";

  mensaje.textContent =
    "⚠ " + texto;

  clearTimeout(
    timerMensaje
  );

  timerMensaje =
    setTimeout(
      () => {

        mensaje.classList.add(
          "hidden"
        );

      },
      5000
    );
}

// ============================================================
// SEGURIDAD
// ============================================================

function esc(valor) {

  return String(valor)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );
}

// ============================================================
// EVENTO DEL FORMULARIO
// ============================================================

form.addEventListener(
  "submit",
  guardarPersonaje
);