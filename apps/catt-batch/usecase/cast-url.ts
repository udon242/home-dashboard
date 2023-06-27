import { execSync } from 'child_process';

export async function castUrl(args: {
  device: string;
  url: string;
  duration: number;
}) {
  const volume = execSync(`catt -d ${args.device} status`)
    .toString()
    .match(/Volume:\s(\d+)/)?.[1];

  execSync(`catt -d ${args.device} volume 0`);

  execSync(`catt -d ${args.device} cast_site '${args.url}'`);

  execSync(`catt -d ${args.device} volume ${volume}`);

  await sleep(args.duration);

  execSync(`catt -d ${args.device} stop`);
}

function sleep(millSecond: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, millSecond);
  });
}
