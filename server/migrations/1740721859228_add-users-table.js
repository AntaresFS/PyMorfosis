/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('users', {
      id: 'id', // crea una columna serial con clave primaria
      email: { type: 'varchar(255)', notNull: true, unique: true },
      password_hash: { type: 'varchar(255)', notNull: true },
      first_name: { type: 'varchar(255)', notNull: true },
      last_name: { type: 'varchar(255)', notNull: true },
      created_at: { type: 'timestamp', default: pgm.func('current_timestamp') }
    });
  };

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('users');
  };
