import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '100px 20px', 
      backgroundColor: '#fff', 
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', color: '#f35779', marginBottom: '20px' }}>
        Welcome to Anna Malick's Shop 🛍️
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#7f8c8d', maxWidth: '600px', marginBottom: '30px' }}>
        Discover our exclusive collection of high-tech gadgets, fashion accessories, and home decor. 
        Quality products delivered right to your door.
      </p>
      <Link to="/products" style={{
        backgroundColor: '#fa6cba',
        color: 'white',
        padding: '15px 30px',
        borderRadius: '30px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        boxShadow: '0 4px 15px rgba(197, 34, 110, 0.3)'
      }}>
        See Products
      </Link>
    </div> 
  );
}

export default Home;
