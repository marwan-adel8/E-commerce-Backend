import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
      orderitem:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true
      }],

      address:{
        type: String,
        required: true
      },
        city:{
        type: String,
        required: true
        },

        phone:{
        type: String,
        required: true
        },

        status:{
        type: String,
        default: "Pending",
        required: true
        },

        totalPrice:{
        type: Number,
        },

        user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
        },

        dataOrdered:{
        type: Date,
        default: Date.now
        },

    
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
