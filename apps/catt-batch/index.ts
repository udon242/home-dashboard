import { CronJob } from 'cron';
import { connect } from 'mqtt';

import { CATTMessage, CATTTopic } from 'entity';

import { castUrl } from './usecase/cast-url';
import { castStop } from './usecase/cast-stop';

const CATT_DEVICE = process.env.CATT_DEVICE;
const CATT_CAST_URL = process.env.CATT_CAST_URL;
const MQTT_USER_NAME = process.env.MQTT_USER_NAME;
const MQTT_PASSWORD = process.env.MQTT_PASSWORD;
const MQTT_URL = process.env.MQTT_URL;
if (!CATT_DEVICE) {
  throw new Error('env CATT_DEVICE is undefined');
}
if (!CATT_CAST_URL) {
  throw new Error('env CATT_CAST_URL is undefined');
}
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
  client.subscribe(TOPIC);
});
client.on('error', (error) => {
  console.error(error);
});
client.on('message', async (topic: CATTTopic, payload) => {
  if (topic !== 'catt') {
    console.error(`Unknown topic: ${topic}`);
    return;
  }

  console.info('subscribe message job start');
  const message: CATTMessage = JSON.parse(payload.toString());
  switch (message.action) {
    case 'cast':
      await castUrl({ device: CATT_DEVICE, url: CATT_CAST_URL });
      break;
    case 'stop':
      await castStop({ device: CATT_DEVICE, url: CATT_CAST_URL });
      break;
  }
});

(function () {
  new CronJob(
    '0 0 * * * *',
    () => {
      const message: CATTMessage = {
        action: 'cast',
      };
      client.publish(TOPIC, JSON.stringify(message));
    },
    null,
    true,
    'Asia/Tokyo'
  );
})();
