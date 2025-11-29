// ------ IMPORTACIONES
// -- Archivos de referencia para objeto tareas.
import type { Todo } from "../models/Todo";

// Debido a que cuando el local no se le coloca ninguna informacion, sale como null, y no es posible colocarle valores con push ya que no es un array, esta funcion actua como un inicializador de dicho array.
export const creacionArrayLocal = () => {
  const tareas = localStorage.getItem("tareas");

  if(tareas == null){
    localStorage.setItem("tareas",JSON.stringify([]));
  }
}

export const guardarTareasLocal = (tarea : Todo) => {

  const tareasData = localStorage.getItem("tareas");

  if(tareasData && tareasData != null){
    try{
      const tareasTotales = JSON.parse(tareasData);
      tareasTotales.push(tarea);

      localStorage.setItem("tareas",JSON.stringify(tareasTotales));

    } catch(error){
      console.log(error);
    }
  }

}

export const guardarTareasLocalLista = (tareas : Todo[]) => {
  localStorage.setItem('tareas',JSON.stringify(tareas));
}

export const obtenerTareasLocal = () => {
  const TareasData = localStorage.getItem("tareas");
  
  if(TareasData != null){
    const TareasTotales = JSON.parse(TareasData);
    
    return TareasTotales;
  }
}

export const obtenerTareasLocalId = (id : number) => {

  const tareasTotales = obtenerTareasLocal();

  const indice : number = tareasTotales.findIndex((item : Todo)=> item.id == id);

  console.log(tareasTotales[indice]);
  return tareasTotales[indice];
}

// localStorage.removeItem('tareas');