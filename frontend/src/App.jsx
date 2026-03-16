import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';

function App() {
  const products = [
    { id: 1, name: "Wireless Headphones", price: 99 },
    { id: 2, name: "Smart Watch", price: 199 },
    { id: 3, name: "Gaming Mouse", price: 49 },
    { id: 4, name: "Mechanical Keyboard", price: 129 },
    { id: 5, name: "New Smartphone", price: 899 },
    { id: 6, name: "Laptop Pro", price: 1499 }
  ];

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