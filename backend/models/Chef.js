const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  socials: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    pinterest: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Chef', chefSchema);
