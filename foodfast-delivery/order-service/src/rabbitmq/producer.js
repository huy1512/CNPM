const amqp = require("amqplib");

const RABBITMQ_URL = "amqp://rabbitmq:5672";

async function publishOrderEvent(order) {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue("order_created");

  const event = {
    orderId: order._id,
    userId: order.userId,
    productId: order.productId,
    quantity: order.quantity,
    status: order.status
  };

  channel.sendToQueue("order_created", Buffer.from(JSON.stringify(event)));
  console.log("✅ Published order event:", event);

  await channel.close();
  await connection.close();
}

module.exports = { publishOrderEvent };
