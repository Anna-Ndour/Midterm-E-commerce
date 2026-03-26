const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const CartItem = require('./models/CartItem');
const User = require('./models/User');

dotenv.config();
const app = express();

const seedProducts = [
  {
    name: "Wireless Headphones",
    price: 99.99,
    description: "High-quality sound with noise cancellation.",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    name: "Smart Watch",
    price: 199.50,
    description: "Track your fitness and notifications on the go.",
    category: "Wearables",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    name: "Leather Backpack",
    price: 75.00,
    description: "Durable and stylish backpack for everyday use.",
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500"
  },
  {
    name: "Mechanical Keyboard",
    price: 120.00,
    description: "RGB backlit keys with a satisfying tactile feel.",
    category: "Computing",
    imageUrl: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500"
  }
];

app.use(cors()); 
app.use(express.json());

const dbURI = "mongodb+srv://admin:test123@ecommerce.dzlh56d.mongodb.net/?appName=Ecommerce";

mongoose.connect(dbURI) 
  .then(() => {
    console.log("Connected to MongoDB atlas !");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message);
  });

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    const existingProducts = await Product.countDocuments();
    if (existingProducts === 0) {
      await Product.insertMany(seedProducts);
      console.log('Database seeded with initial products!');
    }
  })
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => res.send('Server is running!'));

app.post('/api/auth/signup', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ 
      message: "User created!", 
      user: { id: newUser._id, username: newUser.username } 
    });
  } catch (err) {
    res.status(400).json({ error: "Email already exists or invalid data" });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password." });
    }

    res.json({ 
      message: "Login successful",
      user: { id: user._id, username: user.username, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
});


app.get('/api/products', async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  const { adminRole } = req.body;
  if (adminRole !== 'admin') {
    return res.status(403).json({ error: "Unauthorized: Admin role required" });
  }
  
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/cart', async (req, res) => {
  try {
    const items = await CartItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/cart', async (req, res) => {
  try {
    const newItem = new CartItem({
      productId: req.body._id,
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/cart/:id', async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
 
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});