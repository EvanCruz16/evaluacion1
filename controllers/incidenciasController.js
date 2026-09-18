const incidencias = [];
let idCounter = 1;

const { esTextoValido, limpiarTexto } = require('../utils/helpers');

//registro
const registrarIncidencia = (req, res) => {
    const { empleado, area, descripcion, prioridad } = req.body;

    //validaciones
    if (!empleado || !area || !descripcion || !prioridad) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    if (!esTextoValido(empleado) || !esTextoValido(area) || !esTextoValido(descripcion) || !esTextoValido(prioridad)) {
        return res.status(400).json({ mensaje: "No se permiten cadenas vacías" });
    }

    const prioridadLimpia = limpiarTexto(prioridad);
    let prioridadFormateada = "";

    switch (prioridadLimpia) {
        case "alta":
            prioridadFormateada = "Alta";
            break;
        case "media":
            prioridadFormateada = "Media";
            break;
        case "baja":
            prioridadFormateada = "Baja";
            break;
        default:
            return res.status(400).json({ mensaje: "Prioridad inválida. Debe ser: Alta, Media o Baja" });
    }

    const nuevaIncidencia = {
        id: idCounter++,
        empleado: empleado.trim(),
        area: area.trim(),
        descripcion: descripcion.trim(),
        prioridad: prioridadFormateada,
        estado: "Pendiente" // Estado por defecto
    };

    //se realiza el push
    incidencias.push(nuevaIncidencia);

    return res.status(201).json({
        mensaje: "Incidencia registrada correctamente"
    });
};

//listamos incidencias
const listarIncidencias = (req, res) => {
    return res.status(200).json(incidencias);
};

//buscar por id
const buscarIncidenciaPorId = (req, res) => {
    const idBuscado = parseInt(req.params.id);

    const incidencia = incidencias.find(inc => inc.id === idBuscado);

    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    return res.status(200).json(incidencia);
};

const cambiarEstadoIncidencia = (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const { estado } = req.body;

    if (!esTextoValido(estado)) {
        return res.status(400).json({ mensaje: "El campo estado es obligatorio" });
    }

    const incidencia = incidencias.find(inc => inc.id === idBuscado);
    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    const estadoLimpio = limpiarTexto(estado);
    let nuevoEstadoValido = "";

    switch (estadoLimpio) {
        case "pendiente":
            nuevoEstadoValido = "Pendiente";
            break;
        case "en proceso":
            nuevoEstadoValido = "En Proceso";
            break;
        case "resuelta":
            nuevoEstadoValido = "Resuelta";
            break;
        case "cancelada":
            nuevoEstadoValido = "Cancelada";
            break;
        default:
            return res.status(400).json({
                mensaje: "Estado inválido. Valores permitidos: Pendiente, En Proceso, Resuelta, Cancelada"
            });
    }

    incidencia.estado = nuevoEstadoValido;
    return res.status(200).json({
        mensaje: "Estado actualizado correctamente",
        incidencia
    });
};

const eliminarIncidencia = (req, res) => {
    const idBuscado = parseInt(req.params.id);

    const index = incidencias.findIndex(inc => inc.id === idBuscado);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    const eliminada = incidencias.splice(index, 1);

    return res.status(200).json({
        mensaje: "Incidencia eliminada correctamente",
        incidencia: eliminada[0]
    });
};

const obtenerEstadisticas = (req, res) => {
    const totalIncidencias = incidencias.length;

    const pendientes = incidencias.filter(inc => inc.estado === "Pendiente").length;
    const enProceso = incidencias.filter(inc => inc.estado === "En Proceso").length;
    const resueltas = incidencias.filter(inc => inc.estado === "Resuelta").length;
    const canceladas = incidencias.filter(inc => inc.estado === "Cancelada").length;

    return res.status(200).json({
        totalIncidencias,
        pendientes,
        enProceso,
        resueltas,
        canceladas
    });
};

const clasificarIncidencia = (req, res) => {
    const idBuscado = parseInt(req.params.id);

    const incidencia = incidencias.find(inc => inc.id === idBuscado);
    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    let clasificacion = "";

    switch (incidencia.prioridad) {
        case "Alta":
            clasificacion = "Crítica";
            break;
        case "Media":
            clasificacion = "Importante";
            break;
        case "Baja":
            clasificacion = "Normal";
            break;
        default:
            clasificacion = "Sin clasificar";
    }

    return res.status(200).json({
        id: incidencia.id,
        clasificacion
    });
};

module.exports = {
    registrarIncidencia,
    listarIncidencias,
    buscarIncidenciaPorId,
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas,
    clasificarIncidencia
};