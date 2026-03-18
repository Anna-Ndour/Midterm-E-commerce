import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ cartCount, onSearch }) {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '10px 50px', 
      backgroundColor: '#2c3e50', 
      color: 'white' 
    }}>
      {/* 🏠 LOGO : Vers l'accueil (/) */}
      <Link to="/" style={{ 
        color: 'white', 
        textDecoration: 'none', 
        fontWeight: 'bold', 
        fontSize: '1.5rem' 
      }}>
        🏠 AM's Shop
      </Link>

      <div style={{ flex: 1, margin: '0 20px', maxWidth: '400px' }}>
        <input 
          type="text" 
          placeholder="Search products..." 
          onChange={(e) => onSearch(e.target.value)}
          style={{ 
            width: '90%', 
            padding: '8px 15px', 
            borderRadius: '20px', 
            border: 'none',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {/* 📦 PRODUCTS : Vers le catalogue (/products) */}
        <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>
          Products
        </Link>
        
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
          Login
        </Link>
        
        <Link to="/cart" style={{ 
          backgroundColor: '#e67e22', 
          padding: '5px 15px', 
          borderRadius: '20px', 
          color: 'white', 
          textDecoration: 'none', 
          fontWeight: 'bold' 
        }}>
          🛒 Cart ({cartCount})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;