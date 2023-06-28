import { connect } from 'mqtt';

import { CATTMessage, CATTTopic } from 'entity';

import 'dotenv/config';

const MQTT_USER_NAME = process.env.MQTT_USER_NAME;
const MQTT_PASSWORD = process.env.MQTT_PASSWORD;
const MQTT_URL = process.env.MQTT_URL;
if (!MQTT_USER_NAME) {
  throw new Error('env MQTT_USER_NAME is undefined');
}
if (!MQTT_PASSWORD) {
  throw new Error('env MQTT_PASSWORD is undefined');
}
if (!MQTT_URL) {
  throw new Error('env MQTT_URL is undefined');
}

const TOPIC: CATTTopic = 'catt';

const client = connect(
  `mqtt://${MQTT_USER_NAME}:${MQTT_PASSWORD}@${MQTT_URL}`,
  {
    clientId: 'catt-batch',
  }
);
client.on('connect', () => {
  const message: CATTMessage = {
    action: 'cast',
    duration: 30000,
  };
  client.publish(TOPIC, JSON.stringify(message));
  client.end();
});
client.on('error', (error) => {
  console.error(error);
});
