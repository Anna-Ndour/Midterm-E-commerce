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
        src={props.imageUrl || 'https://via.placeholder.com/150'} 
        alt={props.name} 
        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} 
      />
      <p style={{ 
          fontSize: '0.7rem', 
          color: '#3498db', 
          fontWeight: 'bold', 
          textTransform: 'uppercase',
          marginTop: '10px',
          marginBottom: '5px'
        }}>
          {props.category || 'General'}
        </p>

      <h3>{props.name}</h3>

      <p style={{ color: '#27ae60', fontWeight: 'bold', fontSize: '1.3rem', margin: '10px 0'  }}>${props.price}</p>
      
      <p style={{ 
          fontSize: '0.9rem', 
          color: '#666', 
          lineHeight: '1.4',
          height: '60px', // Hauteur fixe pour que toutes les cartes soient égales
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {props.description || 'No description provided.'}
        </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button 
          onClick={props.onAddToCart}
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
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