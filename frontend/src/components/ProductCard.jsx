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
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      backgroundColor: 'white' // Optionnel: pour mieux voir le relief
    }}>
      <img 
        src={props.image || 'https://via.placeholder.com/150'} 
        alt={props.name} 
        style={{ width: '100%', borderRadius: '5px' }} 
      />
      <h3>{props.name}</h3>
      <p style={{ color: '#27ae60', fontWeight: 'bold' }}>${props.price}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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

        {/* --- NOUVEAU BOUTON DELETE --- */}
        <button 
          onClick={() => props.onDelete(props.id)} 
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;