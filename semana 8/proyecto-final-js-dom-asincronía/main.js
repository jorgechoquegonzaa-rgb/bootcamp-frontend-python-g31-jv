const API_URL="https://apibox.vercel.app/YXyfxSNN9Z1CBUusBSs2w9XgnAdvw2jZ/api/dragonball";
const POR_PAGINA=5;
let personajes=[], paginaActual=1;

const form=document.getElementById("formPersonaje");
const personajeId=document.getElementById("personajeId");
const nombre=document.getElementById("nombre");
const imagen=document.getElementById("imagen");
const raza=document.getElementById("raza");
const genero=document.getElementById("genero");
const submitBtn=document.getElementById("submitBtn");
const cancelBtn=document.getElementById("cancelBtn");
const lista=document.getElementById("lista");
const contador=document.getElementById("contador");
const loading=document.getElementById("loading");
const vacio=document.getElementById("vacio");
const paginacion=document.getElementById("paginacion");
const numerosPagina=document.getElementById("numerosPagina");
const mensaje=document.getElementById("mensaje");
const btnPrimera=document.getElementById("btnPrimera");
const btnAnterior=document.getElementById("btnAnterior");
const btnSiguiente=document.getElementById("btnSiguiente");
const btnUltima=document.getElementById("btnUltima");

document.addEventListener("DOMContentLoaded",cargarPersonajes);

async function cargarPersonajes(){
  mostrarLoading(true);
  try{
    const response=await fetch(API_URL);
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    const data=await response.json();
    personajes=Array.isArray(data)?data:(data.items||[]);
    paginaActual=1;
    renderizar();
  }catch(error){
    console.error(error);
    mostrarError("No se pudieron cargar los personajes. Revisa APIBox y tu conexión.");
  }finally{mostrarLoading(false);}
}

function renderizar(){
  contador.textContent=personajes.length;
  lista.innerHTML="";
  if(!personajes.length){vacio.classList.remove("hidden");paginacion.classList.add("hidden");return;}
  vacio.classList.add("hidden");
  const total=Math.ceil(personajes.length/POR_PAGINA);
  if(paginaActual>total) paginaActual=total;
  const inicio=(paginaActual-1)*POR_PAGINA;
  personajes.slice(inicio,inicio+POR_PAGINA).forEach(p=>lista.appendChild(crearTarjeta(p)));
  actualizarPaginacion(total);
}

function crearTarjeta(p){
  const li=document.createElement("li");
  li.className="personaje-card";
  const url=typeof p.image==="string"?p.image.trim():"";
  const nom=p.name||"Sin nombre", r=p.race||"Desconocida", g=p.gender||"";
  const imagenHtml=url
    ? `<img class="personaje-img" src="${esc(url)}" alt="${esc(nom)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.classList.remove('hidden')"><div class="personaje-placeholder hidden">DB</div>`
    : `<div class="personaje-placeholder">DB</div>`;
  const generoHtml=g?`<span class="badge ${g==="Female"?"badge-female":"badge-genero"}">${esc(g)}</span>`:"";
  li.innerHTML=`${imagenHtml}
    <div class="personaje-info"><h3>${esc(nom)}</h3><div class="badges">
    <span class="badge badge-raza">${esc(r)}</span>${generoHtml}</div></div>
    <div class="acciones">
    <button class="btn-accion btn-editar">♢ &nbsp;Editar</button>
    <button class="btn-accion btn-eliminar">♜ &nbsp;Eliminar</button>
    </div>`;
  li.querySelector(".btn-editar").addEventListener("click",()=>editarPersonaje(p.id));
  li.querySelector(".btn-eliminar").addEventListener("click",()=>eliminarPersonaje(p.id));
  return li;
}

async function guardarPersonaje(e){
  e.preventDefault();
  const datos={name:nombre.value.trim(),image:imagen.value.trim(),race:raza.value.trim()};
  if(genero.value) datos.gender=genero.value;
  if(!datos.name||!datos.image||!datos.race){mostrarError("Completa Nombre, Imagen y Raza.");return;}
  const id=personajeId.value.trim(), edicion=Boolean(id);
  submitBtn.disabled=true; submitBtn.textContent=edicion?"Guardando...":"Agregando...";
  try{
    const response=await fetch(edicion?`${API_URL}/${encodeURIComponent(id)}`:API_URL,{
      method:edicion?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(datos)
    });
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    mostrarOk(edicion?"Personaje actualizado correctamente.":"Personaje agregado correctamente.");
    limpiarFormulario(); await cargarPersonajes();
  }catch(error){console.error(error);mostrarError("No se pudo guardar el personaje en APIBox.");}
  finally{submitBtn.disabled=false;submitBtn.innerHTML=edicion?"♢ &nbsp;Actualizar Personaje":"＋ &nbsp;Agregar Personaje";}
}

async function editarPersonaje(id){
  try{
    const response=await fetch(`${API_URL}/${encodeURIComponent(id)}`);
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    const p=await response.json();
    personajeId.value=p.id||id; nombre.value=p.name||""; imagen.value=p.image||""; raza.value=p.race||""; genero.value=p.gender||"";
    submitBtn.textContent="♢  Actualizar Personaje"; cancelBtn.classList.remove("hidden");
    window.scrollTo({top:0,behavior:"smooth"}); nombre.focus();
  }catch(error){console.error(error);mostrarError("No se pudo obtener el personaje para editar.");}
}

async function eliminarPersonaje(id){
  const p=personajes.find(x=>String(x.id)===String(id));
  if(!confirm(`¿Deseas eliminar a ${p?.name||"este personaje"}?`)) return;
  try{
    const response=await fetch(`${API_URL}/${encodeURIComponent(id)}`,{method:"DELETE"});
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    mostrarOk("Personaje eliminado correctamente."); await cargarPersonajes();
  }catch(error){console.error(error);mostrarError("No se pudo eliminar el personaje.");}
}

function limpiarFormulario(){form.reset();personajeId.value="";genero.value="";submitBtn.innerHTML="＋ &nbsp;Agregar Personaje";cancelBtn.classList.add("hidden");}
function actualizarPaginacion(total){
  if(total<=1){paginacion.classList.add("hidden");return;}
  paginacion.classList.remove("hidden");
  btnPrimera.disabled=paginaActual===1;btnAnterior.disabled=paginaActual===1;btnSiguiente.disabled=paginaActual===total;btnUltima.disabled=paginaActual===total;
  numerosPagina.innerHTML="";
  for(let i=1;i<=total;i++){
    const b=document.createElement("button");b.textContent=i;if(i===paginaActual)b.classList.add("activo");
    b.addEventListener("click",()=>{paginaActual=i;renderizar();});numerosPagina.appendChild(b);
  }
}
btnPrimera.addEventListener("click",()=>{paginaActual=1;renderizar()});
btnAnterior.addEventListener("click",()=>{if(paginaActual>1){paginaActual--;renderizar()}});
btnSiguiente.addEventListener("click",()=>{const t=Math.ceil(personajes.length/POR_PAGINA);if(paginaActual<t){paginaActual++;renderizar()}});
btnUltima.addEventListener("click",()=>{paginaActual=Math.ceil(personajes.length/POR_PAGINA);renderizar()});
form.addEventListener("submit",guardarPersonaje);cancelBtn.addEventListener("click",limpiarFormulario);

function mostrarLoading(v){loading.classList.toggle("hidden",!v);if(v){lista.innerHTML="";vacio.classList.add("hidden");paginacion.classList.add("hidden");}}
let timer;
function mostrarOk(t){mensaje.className="mensaje ok";mensaje.textContent="✓ "+t;clearTimeout(timer);timer=setTimeout(()=>mensaje.classList.add("hidden"),3000);}
function mostrarError(t){mensaje.className="mensaje error";mensaje.textContent="⚠ "+t;clearTimeout(timer);timer=setTimeout(()=>mensaje.classList.add("hidden"),5000);}
function esc(v){return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");}
