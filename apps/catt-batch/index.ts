import { CronJob } from 'cron';
import { execSync } from 'child_process';

const DEVICE = process.env.CATT_DEVICE;
const CATT_CAST_URL = process.env.CATT_CAST_URL;

const sleep = (millSecond: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, millSecond);
  });
};

const job = async () => {
  if (!DEVICE) {
    console.error('env CATT_DEVICE is undefined');
    return;
  }
  if (!CATT_CAST_URL) {
    console.error('env CATT_CAST_URL is undefined');
    return;
  }

  console.info('catt batch start');

  const volume = execSync(`catt -d ${DEVICE} status`)
    .toString()
    .match(/Volume:\s(\d+)/)?.[1];

  execSync(`catt -d ${DEVICE} volume 0`);

  execSync(`catt -d ${DEVICE} cast_site '${CATT_CAST_URL}'`);

  execSync(`catt -d ${DEVICE} volume ${volume}`);

  await sleep(30000);

  execSync(`catt -d ${DEVICE} stop`);

  console.info('catt batch end');
};

(function () {
  new CronJob('0 0 * * * *', job, null, true, 'Asia/Tokyo');
})();
