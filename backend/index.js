const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await db.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );
    res.status(201).send('Contacto guardado');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al guardar el contacto');
  }
}); // 👈 Esta es la llave de cierre correcta para app.post()

app.get('/api/contact', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM contacts');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener contactos');
  }
}); // 👈 También se cierra correctamente

app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});
