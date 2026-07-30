const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
  credentials: true
}));

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

app.get('/api/vehicles', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM vehicles WHERE status = "available"');
    await connection.end();
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/vehicles/buy', async (req, res) => {
  const { vehicleId, ownerAddress, tokenId } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      'UPDATE vehicles SET status = "sold", owner_address = ?, token_id = ? WHERE id = ?',
      [ownerAddress, tokenId, vehicleId]
    );
    await connection.end();
    res.json({ success: true, message: 'Achat enregistre avec succes dans la BDD' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur Backend lance sur http://localhost:${PORT}`);
});
