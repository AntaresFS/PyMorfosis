const express = require('express');
const router = express.Router();
const pool = require('../db'); // Importar conexión a PostgreSQL

// Obtener todas las matrículas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM matricula');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener matrículas' });
  }
});

// Obtener una matricula por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM matricula WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Matrícula no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la matrícula' });
  }
});

// Crear una nueva matrícula
router.post('/', async (req, res) => {
  try {
    const { email, password_hash, first_name, last_name, phone } = req.body;
    const result = await pool.query(
      'INSERT INTO matricula (email, password_hash, first_name, last_name, phone, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
      [email, password_hash, first_name, last_name, phone]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la matrícula' });
  }
});

// Actualizar una matrícula
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password_hash, first_name, last_name, phone } = req.body;

    const result = await pool.query(
      'UPDATE matricula SET email = $1, password_hash = $2, first_name = $3, last_name = $4, phone = $5 WHERE id = $6 RETURNING *',
      [email, password_hash, first_name, last_name, phone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Matrícula no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la matrícula' });
  }
});

// Eliminar una matrícula
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM matricula WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Matricula no encontrado' });
    }

    res.json({ message: 'Matrícula eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la matrícula' });
  }
});

module.exports = router;
