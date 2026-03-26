import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import CartPage from './components/CartPage';

const API_BASE_URL = 'https://ams-e-commerce.onrender.com';

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    try {
      setUser(JSON.parse(savedUser));
    } catch (error) {
      console.error("Erreur de lecture du LocalStorage", error);
    }
  }
}, []);

  useEffect(() => {
    fetch('${API_BASE_URL}/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Loading Error:", err));

    fetch('${API_BASE_URL}/api/cart')
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((err) => console.error("Loading Error:", err));
  }, []);

  const addToCart = async (product) => { 
    try {
      const response = await fetch('${API_BASE_URL}/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (response.ok) { 
        const newItem = await response.json();
        setCart([...cart, newItem]);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/${cartItemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCart(cart.filter(item => item._id !== cartItemId));
      }
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { 
      name, 
      price: parseFloat(price), 
      imageUrl, 
      category, 
      description, 
      adminRole: user?.role 
    };


    fetch('${API_BASE_URL}/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
    .then((res) => res.json())
    .then((addedProduct) => {
      setProducts([...products, addedProduct]);
      setName(''); setPrice(''); setImageUrl(''); setCategory(''); setDescription('');
    })
    .catch((err) => console.error("Creation error:", err));
  };

  const deleteProduct = (id) => {
    fetch(`${API_BASE_URL}/api/products/${id}`, { method: 'DELETE' })
    .then(() => {
      setProducts(products.filter((p) => p._id !== id));
    })
    .catch((err) => console.error("Deletion error:", err));
  };

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.name?.toLowerCase().includes(term) ||
      product.category?.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      
    
      <Navbar cartCount={cart.length} onSearch={setSearchTerm} />

      {user && user.role=== 'admin'? (
        <section className="admin-form">
          <h2 style={{ textAlign: 'center', color: '#2c3e50', marginTop: '30px' }}>Admin Panel - Add New Product</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
                <input type="number" placeholder="Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} required style={inputStyle} />
                <input type="text" placeholder="Image URL (Unsplash link)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={inputStyle} />
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle} />
                <textarea placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...inputStyle, minHeight: '80px' }} />
                <button type="submit" style={submitButtonStyle}>Create Product</button>
          </form>
        </section>
      ) : (
        <div className="client-message">
          <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>Welcome to our store! Browse products and add them to your cart.</p>
        </div>
      )}

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/products" element={
          <main style={{ padding: '40px', flex: 1 }}>
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Product Management</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '25px' }}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard 
                    key={product._id} 
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    category={product.category}
                    description={product.description}
                    onDelete={deleteProduct} 
                    onAddToCart={() => addToCart(product)} 
                  />
                ))
              ) : (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                  <p style={{ color: '#888', fontSize: '1.1rem' }}>No products found. Try a different search or add a new one!</p>
                </div>
              )}
            </div>
          </main>
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/cart" element={<CartPage cart={cart} onRemove={removeFromCart} />} />
      </Routes>

      <Footer />
    </div>
  );
}

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontSize: '1rem',
  outline: 'none'
};

const submitButtonStyle = {
  backgroundColor: '#2ecc71',
  color: 'white',
  border: 'none',
  padding: '14px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1rem',
  transition: 'background 0.3s'
};

export default App;