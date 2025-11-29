// -- Archivo para renderiza Tablas, representandolo en el UI
import { RenderizarTareasHTML } from "../ui/TodoList.js";
// -- Archivo para realizar obtención y guardado de datos en LocalStorage
import { creacionArrayLocal } from "../utils/storage.js";
import { guardarTareasLocal } from "../utils/storage.js";
import { obtenerTareasLocal } from "../utils/storage.js";
import { guardarTareasLocalLista } from "../utils/storage.js";
// Create - Crear una tarea
export const crearTarea = (tarea) => {
    creacionArrayLocal();
    guardarTareasLocal(tarea);
    RenderizarTareasHTML();
};
export const eliminarTarea = (id) => {
    const tareasTotales = obtenerTareasLocal();
    console.log(tareasTotales);
    const indice = tareasTotales.findIndex(item => item.id == id);
    tareasTotales.splice(indice, 1);
    localStorage.setItem('tareas', JSON.stringify(tareasTotales));
    RenderizarTareasHTML();
};
export const completarTarea = (id) => {
    const tareasTotales = obtenerTareasLocal();
    const indice = tareasTotales.findIndex(item => item.id == id);
    if (indice !== -1 && tareasTotales) {
        const tarea = tareasTotales[indice];
        tarea.completed = !tarea.completed;
    }
    guardarTareasLocalLista(tareasTotales);
    RenderizarTareasHTML();
};
export const modificacionTarea = (id, texto) => {
    const tareasTotales = obtenerTareasLocal();
    const indice = tareasTotales.findIndex(item => item.id == id);
    console.log(indice);
    if (indice !== -1) {
        const tareaSeleccionada = tareasTotales[indice];
        if (tareaSeleccionada) {
            tareaSeleccionada.text = texto;
            console.log(tareaSeleccionada);
            console.log(tareasTotales);
            guardarTareasLocalLista(tareasTotales);
            RenderizarTareasHTML();
        }
    }
    //guardarTareasLocalLista(tareasTotales);
    //RenderizarTareasHTML();
};
//# sourceMappingURL=TodoServices.js.map