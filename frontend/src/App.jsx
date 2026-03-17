import React, { useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error=> console.error('Error fetching products:', error));

  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      <main style={{ padding: '40px', flex: 1 }}>
        <h1 style={{ textAlign: 'center' }}>Our Products</h1>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              name={product.name} 
              price={product.price} 
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;