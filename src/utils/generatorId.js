// Importaciones de funcionalidades externas
import { obtenerTareasLocal } from '../utils/storage.js';
export const generadorIDitemTareas = () => {
    let almacen = obtenerTareasLocal();
    let numeroId = [];
    almacen.forEach(item => {
        numeroId.push(item.id);
    });
    const idsOrdenados = numeroId.sort((a, b) => a - b);
    const ultimoId = idsOrdenados[idsOrdenados.length - 1];
    // console.log(ultimoId);
    if (ultimoId || ultimoId === 0) {
        return ultimoId + 1;
    }
    else {
        console.log("Error, ultimoId no fue encontrado");
        return 0;
    }
};
//# sourceMappingURL=generatorId.js.map