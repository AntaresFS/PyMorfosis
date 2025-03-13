const express = require('express');
const router = express.Router();
const pool = require('../db'); // Importar conexión a PostgreSQL

// Obtener todos los cursos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Curso');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener cursos' });
  }
});

// Obtener un curso por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Curso WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el curso' });
  }
});

// Crear un nuevo curso
router.post('/', async (req, res) => {
  try {
    const { title, description, subject, grade_level, teacher_id, start_date, end_date } = req.body;
    const result = await pool.query(
      'INSERT INTO Curso (title, description, subject, grade_level, teacher_id, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, subject, grade_level, teacher_id, start_date, end_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el curso' });
  }
});

// Actualizar un curso
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, subject, grade_level, teacher_id, start_date, end_date } = req.body;

    const result = await pool.query(
      'UPDATE Curso SET title = $1, description = $2, subject = $3, grade_level = $4, teacher_id = $5, start_date = $6, end_date = $7 WHERE id = $8 RETURNING *',
      [title, description, subject, grade_level, teacher_id, start_date, end_date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el curso' });
  }
});

// Eliminar un curso
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM Curso WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    res.json({ message: 'Curso eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el curso' });
  }
});

module.exports = router;
