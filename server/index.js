require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.send("¡Bienvenido a PyMorfosis API!");
});

// Rutas
app.use('/api/admins', require('./routes/admins'));
app.use('/api/profesores', require('./routes/profesores'));
app.use('/api/alumnos', require('./routes/alumnos'));
app.use('/api/apoderados', require('./routes/apoderados'));
app.use('/api/cursos', require('./routes/cursos'));
app.use("/api/matriculas", require("./routes/matriculas"));

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});