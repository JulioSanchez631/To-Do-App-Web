// Importacion de funciones de obtencion personalizada desde Storage.js
import { obtenerTareasLocal } from "../utils/storage.js";
import { obtenerTareasLocalId } from "../utils/storage.js";
// Importacion de funciones de TodoServices.ts (CRUD)
import { eliminarTarea } from "../services/TodoServices.js";
import { completarTarea } from "../services/TodoServices.js";
import { modificacionTarea } from "../services/TodoServices.js";
// Importacion de BootStrap
// import * as bootstrap from 'bootstrap';
// Referencias a elementos HTML
const contenedorSeccionTareas = document.querySelector(".contenedor-tareas");
// ----------------------------------------------------------------------------------------------
const eventos = () => {
    const btnEliminarTareas = document.querySelectorAll(".btns-eliminar-tareas");
    btnEliminarTareas.forEach(item => {
        item.addEventListener("click", () => {
            const valorIdTarea = item.querySelector('.id-tarea-item')?.innerHTML;
            if (typeof valorIdTarea == 'string') {
                const valorIdTareaEntero = parseInt(valorIdTarea, 10);
                console.log(valorIdTareaEntero);
                activadorBtnEliminarTarea(valorIdTareaEntero);
            }
        });
    });
    const btnsCompletarTareas = document.querySelectorAll('.btns-completar-tareas');
    btnsCompletarTareas.forEach(item => {
        item.addEventListener('click', () => {
            const valorIdTarea = item.querySelector('.id-tarea-item')?.innerHTML;
            if (typeof valorIdTarea == 'string') {
                const valorIdTareaEntero = parseInt(valorIdTarea, 10);
                activadorBtnCompletarTarea(valorIdTareaEntero);
            }
        });
    });
    // Codigo para poder realizar la modificacion de valores en cada tarea seleccionada.
    let idActual;
    const btnsAbrirModal = document.querySelectorAll('.btns-editar-tareas');
    btnsAbrirModal.forEach(item => {
        item.addEventListener('click', () => {
            const valorItem = item.querySelector('.id-tarea-item');
            if (valorItem) {
                const texto = document.getElementById('message-text');
                console.log(texto);
                const valorIdItem = parseInt(valorItem?.innerHTML);
                if (texto) {
                    const valorActualText = obtenerTareasLocalId(valorIdItem).text;
                    console.log(valorActualText);
                    texto.value = valorActualText;
                }
                idActual = valorIdItem;
            }
        });
    });
    const btnGuardarTarea = document.getElementById('btn-guardar-cambio');
    btnGuardarTarea?.addEventListener('click', () => {
        const textoHTML = document.getElementById('message-text');
        console.log(textoHTML);
        const textoValue = textoHTML?.value;
        // No se esta obteniendo valores del textoValue, es decir, no tiene nada, algo ocurrio.
        console.log(textoValue);
        if (textoValue) {
            modificacionTarea(idActual, textoValue);
        }
    });
    const inputFiltrado = document.getElementById('input-filtros');
    // const btnActivadorFiltrado = document.getElementById('btn-filtrado') as HTMLButtonElement;
    const formFiltrado = document.getElementById('form-tareas-filtro');
    const tareasDOM = document.querySelectorAll('.item-tarea');
    const tareasTotales = obtenerTareasLocal();
    let idSeleccion = [];
    formFiltrado.addEventListener('submit', (e) => {
        e.preventDefault();
        if (inputFiltrado.value == 'Todas') {
            for (const elemento of tareasDOM) {
                elemento.classList.add('mostrar');
                elemento.classList.remove('ocultar');
            }
        }
        else if (inputFiltrado.value == 'Completadas') {
            tareasTotales.forEach((item) => {
                if (item.completed == false) {
                    idSeleccion.push(item.id);
                }
            });
            for (const elemento of tareasDOM) {
                elemento.classList.add('mostrar');
            }
            idSeleccion.forEach(item => {
                tareasDOM[item]?.classList.remove('mostrar');
                tareasDOM[item]?.classList.add('ocultar');
            });
            idSeleccion = [];
        }
        else if (inputFiltrado.value == 'Pendientes') {
            tareasTotales.forEach((item) => {
                if (item.completed == true) {
                    idSeleccion.push(item.id);
                }
            });
            for (const elemento of tareasDOM) {
                elemento.classList.add('mostrar');
            }
            idSeleccion.forEach(item => {
                tareasDOM[item]?.classList.remove('mostrar');
                tareasDOM[item]?.classList.add('ocultar');
            });
            idSeleccion = [];
        }
    });
};
export const RenderizarTareasHTML = () => {
    const tareasTotales = obtenerTareasLocal();
    if (tareasTotales) {
        const contenedorListadoTareas = document.querySelector(".contenedor-listado-tareas");
        contenedorListadoTareas.innerHTML = ``;
        let plantillaHTML = ``;
        tareasTotales.forEach((item) => {
            plantillaHTML = ``;
            const contenedorItemTarea = document.createElement("DIV");
            contenedorItemTarea.classList.add("item-tarea");
            if (item.completed == true) {
                contenedorItemTarea.classList.add("completado");
            }
            else if (item.completed == false) {
                contenedorItemTarea.classList.add("incompleto");
            }
            // El target es #myModal
            plantillaHTML += `
        <p>${item.text}</p>
        <div class="contenedor-acciones-item-tarea">
          <button class='btns-completar-tareas'> 
            <span style='display:none;' class='id-tarea-item'> ${item.id} </span>
            <i class="fa-solid fa-check"></i> 
          </button>
          
          <button class='btns-eliminar-tareas'">
            <span style='display:none;' class='id-tarea-item'> ${item.id} </span>
            <i class="fa-solid fa-delete-left"></i>
          </button>


          <button class="btns-editar-tareas" type="button" data-bs-toggle="modal" data-bs-target="#myModal">
            <span style='display:none;' class='id-tarea-item'> ${item.id} </span>
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
      
        `;
            contenedorItemTarea.innerHTML = plantillaHTML;
            contenedorListadoTareas?.appendChild(contenedorItemTarea);
        });
    }
    eventos();
};
const activadorBtnEliminarTarea = (id) => {
    eliminarTarea(id);
};
const activadorBtnCompletarTarea = (id) => {
    completarTarea(id);
};
// const btnGuardarTarea = document.getElementById('btn-guardar-cambio');
const ProcesoModal = (id) => {
    const texto = document.getElementById('message-text');
    if (texto) {
        texto.innerHTML = obtenerTareasLocalId(id).text;
    }
};
RenderizarTareasHTML();
//# sourceMappingURL=TodoList.js.map