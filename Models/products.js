const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  imageURLs: {type:String},
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller'
  },
 

} , { timestamps: true },);

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
