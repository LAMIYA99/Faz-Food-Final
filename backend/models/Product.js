const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  longDescription: { type: String },
  additionalInformation: {
    weight: { type: String },
    size: { type: String },
    serves: { type: String },
  },
  category: { type: String },
  image: { type: String },
  rating: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  reviews: [{
    user: { type: String },
    rating: { type: Number },
    comment: { type: String },
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
