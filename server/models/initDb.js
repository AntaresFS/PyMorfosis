require('dotenv').config({ path: '../.env' }); 
const { Pool } = require('pg');

// Configura la conexión a la base de datos usando las variables de entorno o valores fijos
const pool = new Pool({
  user: process.env.DB_USER || 'tu_usuario',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'tu_basedatos',
  password: process.env.DB_PASSWORD || 'tu_contraseña',
  port: process.env.DB_PORT || 5432,
});

console.log("Esperando 5 segundos para asegurar que PostgreSQL esté listo...");

setTimeout(async () => {
  console.log("Intentando inicializar la base de datos...");
  await initDB();
}, 5000);

async function initDB() {
  try {
    // Tabla Administrador
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Administrador (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabla Profesor
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Profesor (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        specialization VARCHAR(255),
        phone VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabla Apoderado
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Apoderado (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabla Alumno
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Alumno (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        date_of_birth DATE,
        phone VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        apoderado_id INTEGER REFERENCES Apoderado(id) ON DELETE SET NULL
      );
    `);

    // Tabla Curso
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Curso (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        subject VARCHAR(255),
        grade_level VARCHAR(50),
        teacher_id INTEGER REFERENCES Profesor(id) ON DELETE SET NULL,
        start_date DATE,
        end_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabla Matrícula
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Matricula (
        id SERIAL PRIMARY KEY,
        alumno_id INTEGER REFERENCES Alumno(id) ON DELETE CASCADE,
        curso_id INTEGER REFERENCES Curso(id) ON DELETE CASCADE,
        matricula_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (alumno_id, curso_id)
      );
    `);

    console.log("Base de datos inicializada correctamente.");
  } catch (err) {
    console.error("Error al inicializar la base de datos:", err);
  } finally {
    pool.end();
  }
}




