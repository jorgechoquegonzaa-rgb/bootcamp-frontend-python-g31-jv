// ============================================
// EJERCICIOS CON FETCH + ASYNC/AWAIT
// ============================================

const url = 'https://jsonplaceholder.typicode.com/users'

// ============================================
// EJERCICIO 1: Mostrar un mensaje de "Cargando..."
// ============================================
const mostrarCargando = () => {
  const estadoDiv = document.querySelector('#estado')
  estadoDiv.innerHTML = `
    <div style="background: #f39c12; color: white; padding: 10px; border-radius: 5px; text-align: center; font-weight: bold;">
      ⏳ Cargando usuarios...
    </div>
  `
}

const ocultarCargando = () => {
  const estadoDiv = document.querySelector('#estado')
  estadoDiv.innerHTML = ''
}

// ============================================
// FUNCIÓN PARA RENDERIZAR USUARIOS
// ============================================
const renderUsers = (users = []) => {
  const divApp = document.querySelector('#app')
  let userLists = ''

  users.forEach(user => {
    userLists += `
      <div style="border: 1px solid #ccc; padding: 15px; margin: 10px 0; border-radius: 8px; background: #f9f9f9;">
        <h2 style="color: #2c3e50;">${user.id} - ${user.name}</h2>
        <p style="color: #555;"><strong>📧 Email:</strong> ${user.email}</p>
        <p style="color: #555;"><strong>🏙️ Ciudad:</strong> ${user.address.city}</p>
        <p style="color: #555;"><strong>🏢 Empresa:</strong> ${user.company.name}</p>
      </div>
    `
  })

  divApp.innerHTML = userLists
}

// ============================================
// EJERCICIO 2: Mostrar solo usuarios de una ciudad
// (Ciudad elegida: "Gwenborough" - es la ciudad del usuario 1)
// ============================================
const filtrarPorCiudad = (users, ciudad) => {
  return users.filter(user => user.address.city === ciudad)
}

// ============================================
// EJERCICIO 3: Mostrar cuántos usuarios hay en el listado
// ============================================
const mostrarTotalUsuarios = (total) => {
  const totalDiv = document.querySelector('#total')
  totalDiv.innerHTML = `
    <div style="background: #2c3e50; color: white; padding: 10px; border-radius: 5px; text-align: center; margin: 10px 0;">
      📊 Total de usuarios: <strong>${total}</strong>
    </div>
  `
}

// ============================================
// FUNCIÓN PRINCIPAL CON MANEJO DE ERRORES
// ============================================
const fetchUsersConManejoDeErrores = async () => {
  try {
    // Mostrar mensaje de "Cargando..." (EJERCICIO 1)
    mostrarCargando()

    const response = await fetch(url)

    console.log('📡 Estado de la respuesta:', response.status)

    if (response.status === 404) {
      throw new Error('ERROR HTTP: ' + response.status + ' - Recurso no encontrado')
    }

    const data = await response.json()

    // ============================================
    // EJERCICIO 3: Mostrar cuántos usuarios hay
    // ============================================
    const totalUsuarios = data.length
    console.log(`📊 Total de usuarios: ${totalUsuarios}`)
    mostrarTotalUsuarios(totalUsuarios)

    // ============================================
    // EJERCICIO 2: Filtrar por ciudad
    // Ciudad elegida: "Gwenborough"
    // (Puedes cambiarla por "Wisokyburgh", "McKenziehaven", etc.)
    // ============================================
    const ciudadFiltro = "Gwenborough"
    const usuariosFiltrados = filtrarPorCiudad(data, ciudadFiltro)
    
    console.log(`🏙️ Usuarios en ${ciudadFiltro}: ${usuariosFiltrados.length}`)
    console.log('📝 Usuarios filtrados:', usuariosFiltrados)

    // Ocultar mensaje de cargando
    ocultarCargando()

    // Renderizar los usuarios filtrados
    renderUsers(usuariosFiltrados)

    // ============================================
    // MOSTRAR INFORMACIÓN ADICIONAL EN CONSOLA
    // ============================================
    console.log('✅ Usuarios cargados correctamente')
    console.log(`🏙️ Filtrados por ciudad: ${ciudadFiltro}`)
    console.log(`👥 Usuarios mostrados: ${usuariosFiltrados.length}`)

  } catch (error) {
    console.error('❌ Error:', error)
    ocultarCargando()
    
    const estadoDiv = document.querySelector('#estado')
    estadoDiv.innerHTML = `
      <div style="background: #e74c3c; color: white; padding: 10px; border-radius: 5px; text-align: center; font-weight: bold;">
        ❌ Error: ${error.message}
      </div>
    `
  }
}

// ============================================
// EJECUTAR LA FUNCIÓN
// ============================================
fetchUsersConManejoDeErrores()
  .then(users => {
    // No es necesario hacer nada aquí porque ya renderizamos dentro
    console.log('🚀 Proceso completado')
  })