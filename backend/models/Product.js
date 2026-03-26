const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  imageUrl: { 
    type: String,
    default : 'https://via.placeholder.com/150' 
  },
  category: {
    type: String
  }
});

module.exports = mongoose.model('Product', productSchema);