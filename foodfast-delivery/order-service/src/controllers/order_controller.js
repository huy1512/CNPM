const Order = require("../models/order");
const { publishOrderEvent } = require("../rabbitmq/producer");

exports.createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const order = new Order({ userId, productId, quantity });
    await order.save();

    // Publish event để Payment Service xử lý
    await publishOrderEvent(order);

    res.json({ message: "Order created successfully", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
