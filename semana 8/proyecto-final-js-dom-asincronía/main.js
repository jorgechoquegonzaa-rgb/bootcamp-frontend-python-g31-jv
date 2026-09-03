// ============================================
// PROYECTO FINAL - DRAGON BALL CRUD
// CORREGIDO PARA NETLIFY
// ============================================

// ============================================
// 1. CONFIGURACIÓN DE LA API
// ============================================
const API_URL =
  "https://apibox.vercel.app/YXyfxSNN9Z1CBUusBSs2w9XgnAdvw2jZ/api/dragonball";

// ============================================
// 2. REFERENCIAS A ELEMENTOS HTML
// ============================================
const form = document.getElementById("formPersonaje");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const loading = document.getElementById("loading");
const vacio = document.getElementById("vacio");
const personajeId = document.getElementById("personajeId");
const nombre = document.getElementById("nombre");
const imagen = document.getElementById("imagen");
const raza = document.getElementById("raza");
const genero = document.getElementById("genero");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

// ============================================
// 3. FUNCIÓN PARA OBTENER PERSONAJES (GET)
// ============================================
const obtenerPersonajes = async () => {
  try {
    loading.classList.remove("hidden");
    lista.innerHTML = "";

    console.log("🔍 Conectando a:", API_URL);

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 👇 NUEVO: Enviar origen para CORS
        Origin: window.location.origin,
      },
    });

    console.log("📡 Estado:", response.status);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const personajes = await response.json();
    console.log("✅ Personajes cargados:", personajes.length);

    loading.classList.add("hidden");
    contador.textContent = personajes.length;

    renderizarPersonajes(personajes);
    return personajes;
  } catch (error) {
    console.error("❌ Error al obtener personajes:", error);
    loading.classList.add("hidden");

    // 👇 NUEVO: Mensaje de error más claro
    lista.innerHTML = `
      <li class="text-center py-8">
        <p class="text-red-500 font-semibold text-lg">⚠️ No se pudieron cargar los personajes</p>
        <p class="text-gray-500 text-sm mt-2">Verifica tu conexión y que APIBox esté disponible.</p>
        <button onclick="obtenerPersonajes()" class="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
          🔄 Reintentar
        </button>
      </li>
    `;
    return [];
  }
};

// ============================================
// 4. FUNCIÓN PARA RENDERIZAR PERSONAJES
// ============================================
const renderizarPersonajes = (personajes = []) => {
  lista.innerHTML = "";

  if (personajes.length === 0) {
    vacio.classList.remove("hidden");
    return;
  }

  vacio.classList.add("hidden");

  personajes.forEach((personaje) => {
    const li = document.createElement("li");
    li.className =
      "personaje-card flex items-center gap-4 bg-white border border-orange-200 rounded-xl px-4 py-3 hover:border-orange-400 transition-colors";

    const imgHtml = personaje.image
      ? `<img src="${personaje.image}" alt="${personaje.name}" class="personaje-img" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'personaje-img-placeholder\\'>${personaje.name.charAt(0).toUpperCase()}</span>'">`
      : `<span class="personaje-img-placeholder">${personaje.name.charAt(0).toUpperCase()}</span>`;

    li.innerHTML = `
      <div class="shrink-0">
        ${imgHtml}
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-bold truncate text-gray-800">${personaje.name}</p>
        <div class="flex flex-wrap items-center gap-2 mt-1">
          <span class="badge-raza">${personaje.race || "Desconocido"}</span>
          ${personaje.gender ? `<span class="badge-genero">${personaje.gender}</span>` : ""}
        </div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button data-action="editar" data-id="${personaje.id}" class="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
          ✏️ Editar
        </button>
        <button data-action="eliminar" data-id="${personaje.id}" class="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-lg hover:bg-red-100 transition-colors cursor-pointer">
          🗑️ Eliminar
        </button>
      </div>
    `;

    lista.appendChild(li);
  });

  document.querySelectorAll('[data-action="editar"]').forEach((btn) => {
    btn.addEventListener("click", () => editarPersonaje(btn.dataset.id));
  });

  document.querySelectorAll('[data-action="eliminar"]').forEach((btn) => {
    btn.addEventListener("click", () => eliminarPersonaje(btn.dataset.id));
  });
};

// ============================================
// 5. FUNCIÓN PARA CREAR PERSONAJE (POST)
// ============================================
const crearPersonaje = async (personaje) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: window.location.origin,
      },
      body: JSON.stringify(personaje),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const nuevoPersonaje = await response.json();
    console.log("✅ Personaje creado:", nuevoPersonaje);

    await obtenerPersonajes();
    return nuevoPersonaje;
  } catch (error) {
    console.error("❌ Error al crear personaje:", error);
    alert(`❌ Error al crear personaje: ${error.message}`);
  }
};

// ============================================
// 6. FUNCIÓN PARA EDITAR PERSONAJE
// ============================================
const editarPersonaje = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Origin: window.location.origin,
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const personaje = await response.json();

    personajeId.value = personaje.id;
    nombre.value = personaje.name || "";
    imagen.value = personaje.image || "";
    raza.value = personaje.race || "";
    genero.value = personaje.gender || "";

    submitBtn.textContent = "🔄 Actualizar Personaje";
    submitBtn.className =
      "flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer";
    cancelBtn.classList.remove("hidden");

    form.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.error("❌ Error al editar personaje:", error);
    alert(`❌ Error al cargar el personaje: ${error.message}`);
  }
};

// ============================================
// 7. FUNCIÓN PARA ACTUALIZAR PERSONAJE (PUT)
// ============================================
const actualizarPersonaje = async (id, personaje) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Origin: window.location.origin,
      },
      body: JSON.stringify(personaje),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const personajeActualizado = await response.json();
    console.log("✅ Personaje actualizado:", personajeActualizado);

    await obtenerPersonajes();
    return personajeActualizado;
  } catch (error) {
    console.error("❌ Error al actualizar personaje:", error);
    alert(`❌ Error al actualizar personaje: ${error.message}`);
  }
};

// ============================================
// 8. FUNCIÓN PARA ELIMINAR PERSONAJE (DELETE)
// ============================================
const eliminarPersonaje = async (id) => {
  if (!confirm("⚠️ ¿Estás seguro de eliminar este personaje?")) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Origin: window.location.origin,
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    console.log(`🗑️ Personaje con ID ${id} eliminado`);
    await obtenerPersonajes();
  } catch (error) {
    console.error("❌ Error al eliminar personaje:", error);
    alert(`❌ Error al eliminar personaje: ${error.message}`);
  }
};

// ============================================
// 9. FUNCIÓN PARA CANCELAR EDICIÓN
// ============================================
const cancelarEdicion = () => {
  form.reset();
  personajeId.value = "";

  submitBtn.textContent = "➕ Agregar Personaje";
  submitBtn.className =
    "flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer";
  cancelBtn.classList.add("hidden");
};

// ============================================
// 10. MANEJAR EL ENVÍO DEL FORMULARIO
// ============================================
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nombreValue = nombre.value.trim();
  const imagenValue = imagen.value.trim();
  const razaValue = raza.value.trim();

  if (!nombreValue) {
    alert("⚠️ Por favor, ingresa el nombre del personaje");
    nombre.focus();
    return;
  }

  if (!imagenValue) {
    alert("⚠️ Por favor, ingresa la URL de la imagen");
    imagen.focus();
    return;
  }

  if (!razaValue) {
    alert("⚠️ Por favor, ingresa la raza del personaje");
    raza.focus();
    return;
  }

  const personajeData = {
    name: nombreValue,
    image: imagenValue,
    race: razaValue,
    gender: genero.value || "",
  };

  const id = personajeId.value;

  if (id) {
    await actualizarPersonaje(id, personajeData);
  } else {
    await crearPersonaje(personajeData);
  }

  cancelarEdicion();
});

// ============================================
// 11. EVENTO: CANCELAR EDICIÓN
// ============================================
cancelBtn.addEventListener("click", cancelarEdicion);

// ============================================
// 12. INICIALIZAR LA APLICACIÓN
// ============================================
console.log("🐉 Dragon Ball CRUD iniciado!");
console.log("📡 Conectando a la API en:", API_URL);
console.log("🌐 Origen:", window.location.origin);

obtenerPersonajes();
