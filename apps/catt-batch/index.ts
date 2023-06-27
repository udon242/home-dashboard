import { CronJob } from 'cron';
import { connect } from 'mqtt';

import { CATTCastMessage, CATTMessage, CATTTopic } from 'entity';

import { castUrl } from './usecase/cast-url';
import { castStop } from './usecase/cast-stop';
import { castVolume } from './usecase/cast-volume';

const { CATT_DEVICE, CATT_CAST_URL, MQTT_USER_NAME, MQTT_PASSWORD, MQTT_URL } =
  process.env;
if (!CATT_DEVICE) throw new Error();
if (!CATT_CAST_URL) throw new Error();
if (!MQTT_USER_NAME) throw new Error();
if (!MQTT_PASSWORD) throw new Error();
if (!MQTT_URL) throw new Error();

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
      await castUrl({
        device: CATT_DEVICE,
        url: CATT_CAST_URL,
        duration: message.duration,
      });
      break;
    case 'stop':
      await castStop({ device: CATT_DEVICE });
      break;
    case 'volume':
      await castVolume({ device: CATT_DEVICE, volume: message.volume });
  }
});

(function () {
  new CronJob(
    '0 0 * * * *',
    () => {
      const message: CATTCastMessage = {
        action: 'cast',
        duration: 60000,
      };
      client.publish(TOPIC, JSON.stringify(message));
    },
    null,
    true,
    'Asia/Tokyo'
  );
})();
