import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';

function App() {
  // 1. États (States) pour stocker les données
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (product) => {
    setCart([...cart, product]);
    console.log("Produit ajouté au panier :", product.name);
    alert(`${product.name} has been added to your cart!`); // Petit message de confirmation
  };
  

  // 2. Charger les produits au démarrage (READ)
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Erreur chargement:", err));
  }, []);

  // 3. Fonction pour ajouter un produit (CREATE)
  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { name, price: parseFloat(price), imageUrl: imageUrl, category, description };

    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
    .then((res) => res.json())
    .then((addedProduct) => {
      setProducts([...products, addedProduct]); // Mise à jour de l'interface
      setName(''); // Reset du formulaire
      setPrice('');
      setImageUrl('');
      setCategory('');
      setDescription('');
    })
    .catch((err) => console.error("Erreur création:", err));
  };

  // 4. Fonction pour supprimer un produit (DELETE)
  const deleteProduct = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      // On retire le produit de la liste locale pour que l'interface change vite
      setProducts(products.filter((p) => p.id !== id));
    })
    .catch((err) => console.error("Erreur suppression:", err));
  };

  const filteredProducts = products.filter((product) => {
  const nameMatch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
  const categoryMatch = product.category?.toLowerCase().includes(searchTerm.toLowerCase());
  return nameMatch || categoryMatch;
});

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Navbar cartCount={cart.length} onSearch={setSearchTerm} />
      
      <main style={{ padding: '40px', flex: 1 }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>E-Commerce Dashboard</h1>

        {/* SECTION FORMULAIRE */}
        <section style={{ 
          maxWidth: '500px', 
          margin: '0 auto 40px', 
          padding: '20px', 
          backgroundColor: '#fff', 
          borderRadius: '10px', 
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
        }}>
          <h3 style={{ marginTop: 0 }}>Add New Product</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text" 
              placeholder="Product Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <input 
              type="number" 
              placeholder="Price" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              required 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <input 
              type="text" 
              placeholder="URL de l'image" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <input 
              type="text" 
              placeholder="Catégorie" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <textarea 
              placeholder="Description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', minHeight: '80px' }}
            />
            <button type="submit" style={{ 
              backgroundColor: '#2ecc71', 
              color: 'white', 
              border: 'none', 
              padding: '12px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              Create Product
            </button>
          </form>
        </section>

        {/* SECTION AFFICHAGE DES PRODUITS */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: '20px' 
        }}>
          {products.length > 0 ? (
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
                onAddToCart={() => addToCart(product)} // On transmet la fonction d'ajout au panier
              />
            ))
          ) : (
            <p>No products available. Add one above!</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;