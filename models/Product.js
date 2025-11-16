import mongoose, { now } from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },

  image: {
    type: String,
    default: "",
  },

  price:{
    type:Number,
    default:0
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  stock:{
    type:Number,
    min:0,
    max:100
  },
  isFeatured:{
    type:Boolean,
    default:false
  },
  
  createdAt:{
    type:Date,
    default:Date.now
  }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
