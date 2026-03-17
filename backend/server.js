const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');
const Product = require('./models/Product');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/products', async (req, res) => {
  try {

    const productsFromDB = await Product.findAll();
    res.json(productsFromDB);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Error creating product" });
  }
});

app.get('/', (req , res) => {
  res.send('Server is running!');
});

const PORT = process.env.PORT || 5000;
sequelize.sync().then(async() => {
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