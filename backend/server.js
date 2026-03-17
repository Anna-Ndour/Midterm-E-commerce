const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');
const Product = require('./models/Product');

dotenv.config();
const app = express();

// --- 1. CONFIGURATION (MIDDLEWARES) ---
// Toujours placer les middlewares AVANT les routes
app.use(cors()); 
app.use(express.json()); 

// Route GET pour récupérer les produits
app.get('/api/products', async (req, res) => {
  console.log("Requête GET reçue sur /api/products");
  try {
    const data = await Product.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route POST pour créer un produit
app.post('/api/products', async (req, res) => {
  console.log("Requête POST reçue avec les données:", req.body);
  try {
    const newP = await Product.create(req.body);
    res.status(201).json(newP);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  console.log("Tentative de suppression de l'ID:", req.params.id);
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// --- 3. DÉMARRAGE ---
const PORT = process.env.PORT || 5000;

sequelize.sync().then(async () => {
  console.log('Database synced successfully');

  const count = await Product.count();
  if (count === 0) {
    await Product.create({
      name: "Database Headset",
      price: 150.00,
      description: "First product from SQLite!"
    });
    console.log('First Product added to the database');
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});