// ----- IMPORTACIONES DE ARCHIVOS
// -- Archivo de referencia para crear cada objeto referenciando cada tarea
import type { Todo } from "../models/Todo";

// -- Archivo para renderiza Tablas, representandolo en el UI
import { RenderizarTareasHTML } from "../ui/TodoList.js";

// -- Archivo para realizar obtención y guardado de datos en LocalStorage
import { creacionArrayLocal } from "../utils/storage.js";
import { guardarTareasLocal } from "../utils/storage.js";
import { obtenerTareasLocal } from "../utils/storage.js";
import { guardarTareasLocalLista } from "../utils/storage.js";

// Create - Crear una tarea
export const crearTarea = (tarea : Todo) => {
  creacionArrayLocal();
  guardarTareasLocal(tarea);
  RenderizarTareasHTML();
}

export const eliminarTarea = (id : number) => {
  const tareasTotales : Todo[] = obtenerTareasLocal();
  
  console.log(tareasTotales);

  const indice : number = tareasTotales.findIndex(item => item.id == id);

  tareasTotales.splice(indice,1);

  localStorage.setItem('tareas',JSON.stringify(tareasTotales));
  RenderizarTareasHTML();
}

export const completarTarea = (id : number) => {
  const tareasTotales : Todo[] = obtenerTareasLocal();

  const indice : number = tareasTotales.findIndex(item => item.id == id);

  if(indice !== -1 && tareasTotales){
    const tarea : Todo = tareasTotales[indice] as Todo;
    tarea.completed = !tarea.completed;
  }

  guardarTareasLocalLista(tareasTotales);
  RenderizarTareasHTML();
}

export const modificacionTarea = (id : number, texto : string) => {

  const tareasTotales : Todo[] = obtenerTareasLocal();

  
  const indice = tareasTotales.findIndex(item => item.id == id);
  console.log(indice);

  if(indice !== -1){
    const tareaSeleccionada = tareasTotales[indice];
    if(tareaSeleccionada){
      tareaSeleccionada.text = texto;
      console.log(tareaSeleccionada);
      console.log(tareasTotales);
      guardarTareasLocalLista(tareasTotales);
      RenderizarTareasHTML();

    }
  }

  //guardarTareasLocalLista(tareasTotales);
  //RenderizarTareasHTML();
}