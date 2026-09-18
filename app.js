const express = require('express');
const app = express();
const PORT = 3894;

app.use(express.json());

const incidenciasRoutes = require('./routes/incidencias');
app.use('/incidencias', incidenciasRoutes);

const { obtenerEstadisticas } = require('./controllers/incidenciasController');
app.get('/estadisticas', obtenerEstadisticas);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});