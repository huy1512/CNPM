const amqp = require("amqplib");
const { publishPaymentEvent } = require("./producer");
const Payment = require("../models/Payment");
const { v4: uuidv4 } = require("uuid");

const RABBITMQ_URL = "amqp://rabbitmq:5672";

async function consumeOrderCreated() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue("order_created");

    console.log("Payment Service listening for order_created...");

    channel.consume("order_created", async (msg) => {
      if (msg !== null) {
        const order = JSON.parse(msg.content.toString());
        console.log("Received order:", order);

        // Giả lập thanh toán
        const success = Math.random() < 0.9;
        const payment = new Payment({
          transactionId: uuidv4(),
          orderId: order.orderId,
          amount: order.amount,
          status: success ? "SUCCESS" : "FAILED",
          idempotencyKey: uuidv4()
        });

        await payment.save();
        publishPaymentEvent(payment);

        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error("RabbitMQ error:", err);
  }
}

module.exports = { consumeOrderCreated };
