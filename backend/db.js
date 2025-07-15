const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',           // tu usuario (por defecto es postgres)
  host: 'localhost',
  database: 'formulario_db',  // nombre que creaste
  password: 'postgres',  // la contraseña que pusiste
  port: 5432,
});

module.exports = pool;
