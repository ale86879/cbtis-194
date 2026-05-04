const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/cbtis194")
    .then(() => console.log("✅ Conectado a MongoDB Compass"))
    .catch(err => console.error("❌ Error:", err));

// Modelo
const Estudiante = mongoose.model('Estudiante', new mongoose.Schema({
    nombre: String, promedio: Number, faltas: Number
}));

// Rutas
app.get('/api/estudiantes', async (req, res) => {
    res.json(await Estudiante.find());
});

app.post('/api/estudiantes', async (req, res) => {
    const { id, nombre, promedio, faltas } = req.body;
    if (id) {
        await Estudiante.findByIdAndUpdate(id, { nombre, promedio, faltas });
    } else {
        await new Estudiante({ nombre, promedio, faltas }).save();
    }
    res.json({ ok: true });
});

app.listen(3000, () => console.log("🚀 Servidor en puerto 3000"));