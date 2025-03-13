const express = require('express');
const router = express.Router();
const pool = require('../db'); // Importar conexión a PostgreSQL

// Obtener todos los administradores
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Administrador');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener administradores' });
  }
});

// Obtener un administrador por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM Administrador WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el administrador' });
  }
});

// Crear un nuevo administrador
router.post('/', async (req, res) => {
  try {
    const { email, password_hash, first_name, last_name, phone } = req.body;
    const result = await pool.query(
      'INSERT INTO Administrador (email, password_hash, first_name, last_name, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [email, password_hash, first_name, last_name, phone]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el administrador' });
  }
});

// Actualizar un administrador
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password_hash, first_name, last_name, phone } = req.body;

    const result = await pool.query(
      'UPDATE Administrador SET email = $1, password_hash = $2, first_name = $3, last_name = $4, phone = $5 WHERE id = $6 RETURNING *',
      [email, password_hash, first_name, last_name, phone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el administrador' });
  }
});

// Eliminar un administrador
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM Administrador WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    res.json({ message: 'Administrador eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el administrador' });
  }
});

module.exports = router;
