import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import CartPage from './components/CartPage';


function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const addToCart = async (product) => { 
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const newItem = await response.json();
        setCart([...cart, newItem]);
      }
    }  catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${cartItemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCart(cart.filter(item => item.id !== cartItemId));
      }
    }  catch (err) {
      console.error("Error removing from cart:", err);

    }
};

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Loading Error:", err));

      fetch('http://localhost:5000/api/cart')
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((err) => console.error("Loading Error:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { name, price: parseFloat(price), imageUrl, category, description };

    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
    .then((res) => res.json())
    .then((addedProduct) => {
      setProducts([...products, addedProduct]);
      setName(''); setPrice(''); setImageUrl(''); setCategory(''); setDescription('');
    })
    .catch((err) => console.error("Erreur création:", err));
  };

  const deleteProduct = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' })
    .then(() => {
      setProducts(products.filter((p) => p.id !== id));
    })
    .catch((err) => console.error("Erreur suppression:", err));
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

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/products" element={
          <main style={{ padding: '40px', flex: 1 }}>
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Product Management</h1>

            <section style={{ 
              maxWidth: '550px', margin: '0 auto 40px', padding: '25px', 
              backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' 
            }}>
              <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Add a New Item</h3>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
                <input type="number" placeholder="Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} required style={inputStyle} />
                <input type="text" placeholder="Image URL (Unsplash link)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={inputStyle} />
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle} />
                <textarea placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...inputStyle, minHeight: '80px' }} />
                <button type="submit" style={submitButtonStyle}>Create Product</button>
              </form>
            </section>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '25px' }}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    id={product.id}
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
        <Route path="/login" element={<Login />} />
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