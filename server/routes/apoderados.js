const express = require('express');
const router = express.Router();
const pool = require('../db'); // Importar conexión a PostgreSQL

// Obtener todos los apoderados
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Apoderado');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener apoderados' });
  }
});

// Obtener un apoderado por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Apoderado WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Apoderado no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el apoderado' });
  }
});

// Crear un nuevo apoderado
router.post('/', async (req, res) => {
  try {
    const { email, first_name, last_name, phone } = req.body;
    const result = await pool.query(
      'INSERT INTO Apoderado (email, password_hash, first_name, last_name, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [email, password_hash, first_name, last_name, phone]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el apoderado' });
  }
});

// Actualizar un apoderado
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, first_name, last_name, phone } = req.body;

    const result = await pool.query(
      'UPDATE Apoderado SET email = $1, first_name = $2, last_name = $3, phone = $4 WHERE id = $5 RETURNING *',
      [email, first_name, last_name, phone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Apoderado no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el apoderado' });
  }
});

// Eliminar un apoderado
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM Apoderado WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Apoderado no encontrado' });
    }

    res.json({ message: 'Apoderado eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el apoderado' });
  }
});

module.exports = router;
