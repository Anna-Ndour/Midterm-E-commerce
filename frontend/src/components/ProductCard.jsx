import React from 'react';

function ProductCard(props) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      width: '200px',
      margin: '10px',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <img 
        src={props.image || 'https://via.placeholder.com/150'} 
        alt={props.name} 
        style={{ width: '100%', borderRadius: '5px' }} 
      />
      <h3>{props.name}</h3>
      <p style={{ color: '#27ae60', fontWeight: 'bold' }}>${props.price}</p>
      <button style={{
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;