import amqplib, { type Connection, type Channel } from "amqplib";
import { logger } from "./logger";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";

let connection: Connection | null = null;
let channel: Channel | null = null;

export async function getChannel(): Promise<Channel> {
  if (channel) return channel;

  connection = await amqplib.connect(RABBITMQ_URL);
  channel = await connection.createChannel();

  connection.on("close", () => {
    logger.warn("RabbitMQ connection closed");
    channel = null;
    connection = null;
  });

  connection.on("error", (err) => {
    logger.error({ err }, "RabbitMQ connection error");
  });

  logger.info("RabbitMQ connected");
  return channel;
}

// Publish message to a queue
export async function publishToQueue(queue: string, data: unknown): Promise<void> {
  const ch = await getChannel();
  await ch.assertQueue(queue, { durable: true });
  ch.sendToQueue(queue, Buffer.from(JSON.stringify(data)), { persistent: true });
}

// Consume messages from a queue
export async function consumeQueue(
  queue: string,
  handler: (data: unknown) => Promise<void>,
): Promise<void> {
  const ch = await getChannel();
  await ch.assertQueue(queue, { durable: true });
  ch.prefetch(1);

  ch.consume(queue, async (msg) => {
    if (!msg) return;
    try {
      const data = JSON.parse(msg.content.toString());
      await handler(data);
      ch.ack(msg);
    } catch (err) {
      logger.error({ err, queue }, "Failed to process queue message");
      ch.nack(msg, false, false); // Dead letter
    }
  });

  logger.info({ queue }, "Consuming queue");
}

// Graceful shutdown
export async function closeRabbitMQ(): Promise<void> {
  if (channel) await channel.close();
  if (connection) await connection.close();
  logger.info("RabbitMQ disconnected");
}
