const express = require('express');
const router = express.Router();
const pool = require('../db'); // Importar conexión a PostgreSQL

// Obtener todos los profesores
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Profesor');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener profesores' });
  }
});

// Obtener un profesor por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Profesor WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el profesor' });
  }
});

// Crear un nuevo profesor
router.post('/', async (req, res) => {
  try {
    const { email, password_hash, first_name, last_name, specialization, phone } = req.body;
    const result = await pool.query(
      'INSERT INTO Profesor (email, password_hash, first_name, last_name, specialization, phone, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
      [email, password_hash, first_name, last_name, specialization, phone]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el profesor' });
  }
});

// Actualizar un profesor
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password_hash, first_name, last_name, specialization, phone } = req.body;

    const result = await pool.query(
      'UPDATE Profesor SET email = $1, password_hash = $2, first_name = $3, last_name = $4, specialization = $5, phone = $6 WHERE id = $7 RETURNING *',
      [email, password_hash, first_name, last_name, specialization, phone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el profesor' });
  }
});

// Eliminar un profesor
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM Profesor WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    res.json({ message: 'Profesor eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el profesor' });
  }
});

module.exports = router;
