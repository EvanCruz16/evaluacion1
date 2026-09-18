const express = require('express');
const router = express.Router();
const {
    registrarIncidencia,
    listarIncidencias,
    buscarIncidenciaPorId,
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    clasificarIncidencia
} = require('../controllers/incidenciasController');

router.post('/', registrarIncidencia);
router.get('/', listarIncidencias);
router.get('/:id', buscarIncidenciaPorId);
router.put('/:id/estado', cambiarEstadoIncidencia);
router.delete('/:id', eliminarIncidencia);
router.get('/:id/clasificacion', clasificarIncidencia);

module.exports = router;