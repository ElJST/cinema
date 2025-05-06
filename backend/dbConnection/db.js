const mysql = require('mysql2');
require('dotenv').config();

const MAX_RETRIES = 10;
const RETRY_DELAY = 3000; // en milisegundos

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  waitForConnections: true,  // Esperar por conexiones disponibles
  connectionLimit: 10,       // Número máximo de conexiones simultáneas
  queueLimit: 0             // Número máximo de conexiones en espera
};

let pool;

function connectWithRetry(attempt = 1) {
  pool = mysql.createPool(dbConfig);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(`Intento ${attempt}: Error al conectar a la base de datos:`, err.message);

      if (attempt < MAX_RETRIES) {
        setTimeout(() => connectWithRetry(attempt + 1), RETRY_DELAY);
      } else {
        console.error('No se pudo conectar a la base de datos después de varios intentos.');
        process.exit(1); // Finaliza la app si no se logra conectar
      }
    } else {
      console.log('Conexión exitosa a la base de datos');
      connection.release(); // Liberamos la conexión para su reutilización
    }
  });
}

connectWithRetry();

module.exports = pool;
