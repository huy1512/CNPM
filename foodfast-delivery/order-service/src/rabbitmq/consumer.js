const amqp = require("amqplib");
const Order = require("../models/order");

const RABBITMQ_URL = "amqp://rabbitmq:5672";

async function consumePaymentEvents() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue("payment_events");

  console.log("📩 Waiting for payment events...");

  channel.consume("payment_events", async (msg) => {
    if (msg !== null) {
      const event = JSON.parse(msg.content.toString());
      console.log("📥 Received payment event:", event);

      // Cập nhật trạng thái order dựa trên event từ Payment Service
      await Order.findByIdAndUpdate(event.orderId, { status: event.status });

      channel.ack(msg);
    }
  });
}

module.exports = { consumePaymentEvents };
