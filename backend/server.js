const express = require('express');
const cors = require('cors');
const db = require('./dbConnection/db.js');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const pool = require('./dbConnection/db.js');

app.get('/moviessss', (req, res) => {
  try{
    pool.query('SELECT * FROM movies', (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
      } else {
        res.send(results)
      }
    });
  }catch(err){
    console.log('cannot get movies from database')
  }
});

// Manejar resgistro de usuario
app.post('/register', async (req, res) => {
  const { name, email, password, credit, date } = req.body;

  try {
    // Verificar si el correo ya está registrado
    const [existing] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }

    // Verificar si la tarjeta de crédito ya está registrada
    const [existingCard] = await db.promise().query('SELECT * FROM users WHERE card = ?', [credit]);
    if (existingCard.length > 0) {
      return res.status(409).json({ error: 'La tarjeta de crédito ya está registrada' });
    }

    // Cifrar la contraseña con bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el número de saltos de bcrypt

    // Insertar nuevo usuario con contraseña cifrada
    await db.promise().query(
      'INSERT INTO users (name, email, password, card, date) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, credit, date]
    );

    res.status(201).json({ success: true, message: 'Usuario registrado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

//manejar Inicio de sesion
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    // Buscar el usuario por correo
    const [user] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (user.length === 0) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña ingresada con el hash de la base de datos
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    // Si la contraseña es válida, enviamos la respuesta con el usuario
    res.json({ success: true, user: user[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Manejar Movies
app.get('/movies', (req, res) => {
  try{
    db.query('SELECT * FROM movies', (err, results) => {
      if (err) {
        console.error('Error al obtener las películas:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }
      res.json(results);
    });
  }catch(err){
    console.log('cannot get movies from database')
  }
});

app.get('/movies/:id', (req, res) => {
  const movieId = req.params.id;

  db.query('SELECT * FROM movies WHERE id = ?', [movieId], (err, results) => {
    if (err) {
      console.error('Error al obtener la película:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }

    res.json(results[0]);
  });
});

// Manejar Seats
app.get('/seats/:movieId', (req, res) => {
  const movieId = req.params.movieId;
  db.query('SELECT * FROM seats WHERE idPeli = ?', [movieId], (err, results) => {
    if (err) {
      console.error('Error al obtener los asientos:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    res.json(results);
  });
});

app.put('/seats/:id', (req, res) => {
  const seatId = req.params.id;
  const { idUser } = req.body;

  const sql = `
    UPDATE seats SET idUser = ?, state = 'ocupado' WHERE id = ?
  `;

  db.query(sql, [idUser, seatId], (err, result) => {
    if (err) {
      console.error('Error al actualizar el asiento:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }

    res.json({ message: 'Asiento actualizado correctamente' });
  });
});

// Manejar Comments
app.get('/comments/:idpeli', (req, res) => {
  const idpeli = req.params.idpeli;
  const sql = `SELECT * FROM comments  WHERE idpeli = ?`;
  db.query(sql, [idpeli], (err, result) => {
      if (err) {
        console.error('Error al obtener los comentarios:', err);
        return res.status(500).json({ error: 'Error del servidor' });
      }

      res.json(result);
    }
  );
});

app.post('/comments/:idpeli', async (req, res) => {
  const idpeli = req.params.idpeli;
  const { nameuser, comment } = req.body;
  const today = new Date().toISOString().split('T')[0];

  try {
    await db.promise().query(
      'INSERT INTO comments (nameuser, idpeli, comment, created_at) VALUES (?, ?, ?, ?)',
      [nameuser, idpeli, comment, today]
    );

    res.status(201).json({ success: true, message: 'Comentario registrado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

app.put('/comments/:id', (req, res) => {
  const commentId = req.params.id;
  const { comment } = req.body;

  const sql = `
    UPDATE comments SET comment = ? WHERE id = ?
  `;

  db.query(sql, [comment, commentId], (err, result) => {
    if (err) {
      console.error('Error al actualizar el comentario:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }

    res.json({ message: 'Comentario actualizado correctamente' });
  });
});

const PORT = process.env.DB_PORT_APP || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://192.168.1.238:${PORT}`);
});
