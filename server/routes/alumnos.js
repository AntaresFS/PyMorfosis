const express = require('express');
const router = express.Router();
const pool = require('../db'); // Importar conexión a PostgreSQL

// Obtener todos los alumnos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Alumno');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener alumnos' });
  }
});

// Obtener un alumno por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Alumno WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el alumno' });
  }
});

// Crear un nuevo alumno
router.post('/', async (req, res) => {
  try {
    const { email, password_hash, first_name, last_name, date_of_birth, phone, apoderado_id } = req.body;
    const result = await pool.query(
      "INSERT INTO Alumno (email, password_hash, first_name, last_name, date_of_birth, phone, apoderado_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [email, password_hash, first_name, last_name, date_of_birth, phone, apoderado_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el alumno' });
  }
});

// Actualizar un alumno
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password_hash, first_name, last_name, date_of_birth, apoderado_id } = req.body;

    const result = await pool.query(
      'UPDATE Alumno SET email = $1, password_hash = $2, first_name = $3, last_name = $4, date_of_birth = $5, apoderado_id = $6 WHERE id = $7 RETURNING *',
      [email, password_hash, first_name, last_name, date_of_birth, apoderado_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el alumno' });
  }
});

// Eliminar un alumno
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM Alumno WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    res.json({ message: 'Alumno eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el alumno' });
  }
});

module.exports = router;
