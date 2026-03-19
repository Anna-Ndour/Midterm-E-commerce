const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');


const Product = require('./models/Product');
const CartItem = require('./models/CartItem');
const User = require('./models/User');

dotenv.config();
const app = express();


app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => res.send('Server is running!'));

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    res.status(201).json({ message: "User created!", user: { id: newUser.id, username: newUser.username } });
  } catch (err) {
    res.status(400).json({ error: "Email already exists or invalid data" });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found. Please sign up." });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password. Try again." });
    }

    res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
});


app.get('/api/products', async (req, res) => {
  console.log("Requête GET reçue sur /api/products");
  try {
    const data = await Product.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

app.get('/api/cart', async (req, res) => {
  try {
    const items = await CartItem.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/cart', async (req, res) => {
  try {
    const newItem = await CartItem.create({
      productId: req.body.id, 
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/cart/:id', async (req, res) => {
  try {
    await CartItem.destroy({ where: { id: req.params.id } });
    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

sequelize.sync( {alter: true }).then(async () => {
  console.log('Database resetted and synced with new columns!');
 
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});