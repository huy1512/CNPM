const amqp = require("amqplib");

const RABBITMQ_URL = "amqp://rabbitmq:5672";

async function publishPaymentEvent(payment) {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue("payment_events");

  const event = {
    orderId: payment.orderId,
    status: payment.status,
    transactionId: payment.transactionId
  };

  channel.sendToQueue("payment_events", Buffer.from(JSON.stringify(event)));
  console.log("Published payment event:", event);

  await channel.close();
  await connection.close();
}

module.exports = { publishPaymentEvent };
