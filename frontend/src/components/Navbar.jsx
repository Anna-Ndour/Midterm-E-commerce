import React from "react";

function Navbar( { cartCount, onSearch }) {
  return (
    <nav style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 50px",
        background: "#2c3e50",
        color: "#fff",
        position: 'sticky',
        top: 0,
        Index: 1000
    }}>
        <button onClick={() => window.location.reload()} style={navButtonStyle}>
        🏠 Anna's shop
      </button>

      {/* BARRE DE RECHERCHE */}
      <div style={{ flex: 1, margin: '0 20px', maxWidth: '400px' }}>
        <input 
          type="text" 
          placeholder="Search products..." 
          onChange={(e) => onSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 15px',
            borderRadius: '20px',
            border: 'none',
            outline: 'none'
          }}
        />
      </div>

      {/* LIENS DE NAVIGATION */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button style={navButtonStyle}>Products</button>
        <button style={navButtonStyle}>Login</button>
        
        <div style={{ 
          backgroundColor: '#e67e22', 
          padding: '5px 12px', 
          borderRadius: '20px', 
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          🛒 Cart ({cartCount})
        </div>
      </div>
    </nav>
  );
}

// Petit objet de style pour réutiliser sur tous les boutons
const navButtonStyle = {
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '1rem',
  cursor: 'pointer',
  fontWeight: '500',
  padding: '5px 10px',
  borderRadius: '4px',
  transition: 'background 0.3s'
};
export default Navbar;