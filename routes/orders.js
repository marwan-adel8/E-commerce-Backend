import express from "express";
const api = process.env.API_URL;
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
const router = express.Router();

router.get(`/`, async (req, res) => {
  const orderList = await Order.find().populate("user").populate("orderitem");
  if (!orderList) {
    res.status(500).json({
      success: false,
      message: "No products found",
    });
  }

  res.send(orderList);
});

router.get(`/count`, async (req, res) => {
  const orderCount = await Order.find().countDocuments();
  if (!orderCount) {
    res.status(500).json({
      success: false,
      message: "No orders found",
    });
  }

  res.send({
    orderCount: orderCount,
  });
});

router.get(`/:id`, async (req, res) => {
  const order = await Order.findById(req.params.id).populate({
    path: "orderitem",
    populate: "product",
  });
  if (!order) {
    res.status(500).json({
      success: false,
      message: "No Orders found",
    });
  }

  res.send(order);
});

router.post(`/`, async (req, res) => {
  const orderItems = await Promise.all(
    req.body.orderitem.map(async (orderItemID) => {
      let newOrderItem = new OrderItem({
        quantity: orderItemID.quantity,
        product: orderItemID.product,
      });

      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );
  let order = new Order({
    orderitem: orderItems,
    address: req.body.address,
    city: req.body.city,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
  });

  order = await order.save();

  if (!order) {
    return res.status(404).send("order cannot found");
  }
  res.send(order);
});

router.put(`/:id`, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );

  if (!order) {
    res.status(500).json({
      success: false,
      message: "order cannot be updated",
    });
  }
  res.send(order);
});

router.delete(`/:id`, (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then(async (order) => {
      if (order) {
        await order.orderitem.map(async (orderItem) => {
          await OrderItem.findByIdAndDelete(orderItem);
        });

        return res.status(200).json({
          success: true,
          message: "the order is deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "order not found",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        error: err,
      });
    });
});

router.get(`/myorder/:userid`, async (req, res) => {
  const orderList = await Order.find({ user: req.params.userid }).populate({
    path: "orderitem",
    populate: "product",
  });
  if (!orderList) {
    res.status(500).json({
      success: false,
      message: "No products found",
    });
  }

  res.send(orderList);
});

export default router;
