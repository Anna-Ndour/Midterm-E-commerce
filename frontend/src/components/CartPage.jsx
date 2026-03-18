import React from 'react';

function CartPage({ cart }) {
  // Calculer le prix total de tous les articles
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', flex: 1 }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>🛒 Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p style={{ fontSize: '1.2rem', color: '#888' }}>Your cart is empty.</p>
          <a href="/products" style={{ color: '#3498db', fontWeight: 'bold' }}>Go shopping!</a>
        </div>
      ) : (
        <div style={{ marginTop: '30px' }}>
          {/* LISTE DES ARTICLES */}
          {cart.map((item, index) => (
            <div key={index} style={cartItemStyle}>
              <img src={item.imageUrl} alt={item.name} style={cartImageStyle} />
              <div style={{ flex: 1, marginLeft: '20px' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
                <p style={{ color: '#7f8c8d', margin: 0 }}>{item.category}</p>
              </div>
              <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${item.price.toFixed(2)}</p>
            </div>
          ))}

          {/* TOTAL ET PAIEMENT */}
          <div style={summaryStyle}>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button style={checkoutButtonStyle}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles internes
const cartItemStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
  padding: '15px',
  borderRadius: '10px',
  marginBottom: '15px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
};

const cartImageStyle = {
  width: '80px',
  height: '80px',
  objectFit: 'cover',
  borderRadius: '5px'
};

const summaryStyle = {
  marginTop: '30px',
  padding: '20px',
  borderTop: '2px solid #ddd',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end'
};

const checkoutButtonStyle = {
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  padding: '12px 30px',
  borderRadius: '5px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '10px'
};

export default CartPage;