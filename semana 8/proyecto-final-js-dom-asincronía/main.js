// ============================================================
// SEMANA 08 - PROYECTO FINAL
// Dragon Ball CRUD
// JavaScript puro + DOM + Fetch + Asincronía
// ============================================================

const API_URL =
  "https://apibox.vercel.app/YXyfxSNN9Z1CBUusBSs2w9XgnAdvw2jZ/api/dragonball";

const form = document.getElementById("formPersonaje");
const personajeId = document.getElementById("personajeId");
const nombre = document.getElementById("nombre");
const imagen = document.getElementById("imagen");
const raza = document.getElementById("raza");
const genero = document.getElementById("genero");

const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const loading = document.getElementById("loading");
const vacio = document.getElementById("vacio");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const tituloFormulario = document.getElementById("tituloFormulario");

const paginacion = document.getElementById("paginacion");
const btnPrimera = document.getElementById("btnPrimera");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnUltima = document.getElementById("btnUltima");
const numerosPaginas = document.getElementById("numerosPaginas");

// 5 personajes por página, como en la imagen.
const POR_PAGINA = 5;

let personajes = [];
let paginaActual = 1;

// ============================================================
// GET - LISTAR PERSONAJES
// ============================================================

async function listarPersonajes() {
  mostrarLoading(true);

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    // APIBox devuelve un arreglo.
    // Estas dos alternativas hacen el código más resistente.
    if (Array.isArray(data)) {
      personajes = data;
    } else if (Array.isArray(data.items)) {
      personajes = data.items;
    } else if (Array.isArray(data.data)) {
      personajes = data.data;
    } else {
      personajes = [];
    }

    if (paginaActual > Math.ceil(personajes.length / POR_PAGINA)) {
      paginaActual = 1;
    }

    renderizarPersonajes();

  } catch (error) {
    console.error(error);

    lista.innerHTML = `
      <div class="vacio">
        <div>⚠️</div>
        <h3>Error al cargar los personajes</h3>
        <p>Verifica tu conexión o la disponibilidad de APIBox.</p>
      </div>
    `;

    paginacion.classList.add("oculto");

  } finally {
    mostrarLoading(false);
  }
}

// ============================================================
// RENDERIZAR
// ============================================================

function renderizarPersonajes() {
  contador.textContent = personajes.length;
  lista.innerHTML = "";

  if (personajes.length === 0) {
    vacio.classList.remove("oculto");
    paginacion.classList.add("oculto");
    return;
  }

  vacio.classList.add("oculto");

  const totalPaginas = Math.ceil(personajes.length / POR_PAGINA);
  const inicio = (paginaActual - 1) * POR_PAGINA;

  const personajesPagina = personajes.slice(
    inicio,
    inicio + POR_PAGINA
  );

  personajesPagina.forEach((personaje) => {
    lista.appendChild(crearTarjeta(personaje));
  });

  if (totalPaginas > 1) {
    paginacion.classList.remove("oculto");
    actualizarPaginacion(totalPaginas);
  } else {
    paginacion.classList.add("oculto");
  }
}

// ============================================================
// CREAR TARJETA
// ============================================================

function crearTarjeta(personaje) {
  const id = personaje.id;

  const card = document.createElement("article");
  card.className = "personaje";

  const nombrePersonaje = personaje.name || "Sin nombre";
  const razaPersonaje = personaje.race || "Sin raza";
  const generoPersonaje = personaje.gender || "";

  // Si la URL guardada no es una imagen directa,
  // se muestra un marcador de respaldo.
  const imagenPersonaje =
    personaje.image ||
    "https://placehold.co/96x96/eaf4ff/2776bf?text=DB";

  const generoHTML = generoPersonaje
    ? `
      <span class="badge badge-genero">
        ${escaparHTML(generoPersonaje)}
      </span>
    `
    : "";

  card.innerHTML = `
    <img
      src="${escaparHTML(imagenPersonaje)}"
      alt="${escaparHTML(nombrePersonaje)}"
      class="personaje-imagen"
      onerror="this.onerror=null;this.src='https://placehold.co/96x96/eaf4ff/2776bf?text=DB';"
    >

    <div class="datos">
      <h3>${escaparHTML(nombrePersonaje)}</h3>

      <div class="badges">
        <span class="badge badge-raza">
          ${escaparHTML(razaPersonaje)}
        </span>

        ${generoHTML}
      </div>
    </div>

    <div class="acciones">

      <button class="btn-editar" type="button">
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>
        </svg>
        Editar
      </button>

      <button class="btn-eliminar" type="button">
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18"/>
          <path d="M8 6V4h8v2"/>
          <path d="M19 6l-1 14H6L5 6"/>
          <path d="M10 11v5"/>
          <path d="M14 11v5"/>
        </svg>
        Eliminar
      </button>

    </div>
  `;

  card.querySelector(".btn-editar")
    .addEventListener("click", () => editarPersonaje(id));

  card.querySelector(".btn-eliminar")
    .addEventListener("click", () => eliminarPersonaje(id));

  return card;
}

// ============================================================
// POST - CREAR
// ============================================================

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = personajeId.value.trim();

  // Los 3 campos obligatorios pedidos por el profesor.
  const personaje = {
    name: nombre.value.trim(),
    image: imagen.value.trim(),
    race: raza.value.trim()
  };

  // Género queda como campo opcional para parecerse
  // a la imagen de referencia.
  if (genero.value) {
    personaje.gender = genero.value;
  }

  if (!personaje.name || !personaje.image || !personaje.race) {
    alert("Nombre, Imagen y Raza son obligatorios.");
    return;
  }

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = id ? "Actualizando..." : "Guardando...";

    if (id) {
      await actualizarPersonaje(id, personaje);
    } else {
      await crearPersonaje(personaje);
    }

    limpiarFormulario();
    await listarPersonajes();

  } catch (error) {
    console.error(error);
    alert("No se pudo guardar el personaje.");

  } finally {
    submitBtn.disabled = false;

    if (!personajeId.value) {
      submitBtn.innerHTML = "<span>＋</span> Agregar Personaje";
    }
  }
});

async function crearPersonaje(personaje) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(personaje)
  });

  if (!response.ok) {
    throw new Error(`POST HTTP ${response.status}`);
  }

  return response.json();
}

// ============================================================
// GET POR ID + PREPARAR EDICIÓN
// ============================================================

async function editarPersonaje(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`GET ID HTTP ${response.status}`);
    }

    const personaje = await response.json();

    cargarFormulario(personaje, id);

  } catch (error) {
    console.error(error);

    // Respaldo: utilizar el personaje que ya tenemos en memoria.
    const personaje = personajes.find(
      item => String(item.id) === String(id)
    );

    if (personaje) {
      cargarFormulario(personaje, id);
    } else {
      alert("No se pudo encontrar el personaje.");
    }
  }
}

function cargarFormulario(personaje, id) {
  personajeId.value = id;
  nombre.value = personaje.name || "";
  imagen.value = personaje.image || "";
  raza.value = personaje.race || "";
  genero.value = personaje.gender || "";

  tituloFormulario.textContent = "EDITAR PERSONAJE";

  submitBtn.innerHTML = "<span>✓</span> Actualizar Personaje";
  cancelBtn.classList.remove("oculto");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ============================================================
// PUT - ACTUALIZAR
// ============================================================

async function actualizarPersonaje(id, personaje) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(personaje)
  });

  if (!response.ok) {
    throw new Error(`PUT HTTP ${response.status}`);
  }

  return response.json();
}

// ============================================================
// DELETE - ELIMINAR
// ============================================================

async function eliminarPersonaje(id) {
  const personaje = personajes.find(
    item => String(item.id) === String(id)
  );

  const nombre = personaje?.name || "este personaje";

  if (!confirm(`¿Deseas eliminar a ${nombre}?`)) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`DELETE HTTP ${response.status}`);
    }

    await listarPersonajes();

  } catch (error) {
    console.error(error);
    alert("No se pudo eliminar el personaje.");
  }
}

// ============================================================
// CANCELAR EDICIÓN
// ============================================================

cancelBtn.addEventListener("click", limpiarFormulario);

function limpiarFormulario() {
  form.reset();
  personajeId.value = "";

  tituloFormulario.textContent = "NUEVO PERSONAJE";

  submitBtn.innerHTML = "<span>＋</span> Agregar Personaje";
  cancelBtn.classList.add("oculto");
}

// ============================================================
// PAGINACIÓN
// ============================================================

function actualizarPaginacion(totalPaginas) {
  btnPrimera.disabled = paginaActual === 1;
  btnAnterior.disabled = paginaActual === 1;

  btnSiguiente.disabled = paginaActual === totalPaginas;
  btnUltima.disabled = paginaActual === totalPaginas;

  numerosPaginas.innerHTML = "";

  const paginas = obtenerPaginas(totalPaginas);

  paginas.forEach((pagina) => {
    if (pagina === "...") {
      const span = document.createElement("span");
      span.className = "numero puntos";
      span.textContent = "...";
      numerosPaginas.appendChild(span);
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "numero";
    button.textContent = pagina;

    if (pagina === paginaActual) {
      button.classList.add("activo");
    }

    button.addEventListener("click", () => {
      paginaActual = pagina;
      renderizarPersonajes();
    });

    numerosPaginas.appendChild(button);
  });
}

function obtenerPaginas(total) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const resultado = [1];

  if (paginaActual > 3) {
    resultado.push("...");
  }

  const inicio = Math.max(2, paginaActual - 1);
  const fin = Math.min(total - 1, paginaActual + 1);

  for (let i = inicio; i <= fin; i++) {
    resultado.push(i);
  }

  if (paginaActual < total - 2) {
    resultado.push("...");
  }

  resultado.push(total);

  return resultado;
}

btnPrimera.addEventListener("click", () => {
  paginaActual = 1;
  renderizarPersonajes();
});

btnAnterior.addEventListener("click", () => {
  if (paginaActual > 1) {
    paginaActual--;
    renderizarPersonajes();
  }
});

btnSiguiente.addEventListener("click", () => {
  const total = Math.ceil(personajes.length / POR_PAGINA);

  if (paginaActual < total) {
    paginaActual++;
    renderizarPersonajes();
  }
});

btnUltima.addEventListener("click", () => {
  paginaActual = Math.ceil(personajes.length / POR_PAGINA);
  renderizarPersonajes();
});

// ============================================================
// UTILIDADES
// ============================================================

function mostrarLoading(estado) {
  loading.classList.toggle("oculto", !estado);
}

function escaparHTML(valor) {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ============================================================
// INICIO
// ============================================================

listarPersonajes();
