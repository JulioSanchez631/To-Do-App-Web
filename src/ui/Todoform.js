// Funcionalidades de CRUD (TodoServices.ts)
import { crearTarea } from "../services/TodoServices.js";
// Elementos HTML del formulario de creación de tareas
const inputFormTexto = document.getElementById("input-tarea-texto");
const formCrearTarea = document.getElementById("form-tarea-crear");
// Funcionalidad para crear ID unicos a cada tarea.
import { generadorIDitemTareas } from "../utils/generatorId.js";
const eventos = () => {
    formCrearTarea?.addEventListener("submit", (e) => {
        e.preventDefault();
        if (formCrearTarea && inputFormTexto) {
            const valor = inputFormTexto.value;
            const nuevaTarea = {
                id: generadorIDitemTareas(),
                text: valor,
                completed: false
            };
            crearTarea(nuevaTarea);
            inputFormTexto.value = "";
        }
    });
};
eventos();
//# sourceMappingURL=Todoform.js.map