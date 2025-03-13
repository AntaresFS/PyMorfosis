const express = require('express');
const router = express.Router();
const pool = require('../db'); // Importar conexión a PostgreSQL

// Obtener todas las matrículas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Matricula');
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
    const result = await pool.query('SELECT * FROM Matricula WHERE id = $1', [id]);

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
    const { alumno_id, curso_id } = req.body;
    const result = await pool.query(
      'INSERT INTO Matricula (alumno_id, curso_id) VALUES ($1, $2) RETURNING *',
      [alumno_id, curso_id]
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
    const { alumno_id, curso_id } = req.body;

    const result = await pool.query(
      'UPDATE Matricula SET alumno_id = $1, curso_id = $2 WHERE id = $3 RETURNING *',
      [alumno_id, curso_id, id]
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
    const result = await pool.query('DELETE FROM Matricula WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Matrícula no encontrada' });
    }

    res.json({ message: 'Matrícula eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la matrícula' });
  }
});

module.exports = router;
