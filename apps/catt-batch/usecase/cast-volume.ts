import { execSync } from 'child_process';

export async function castVolume(args: { device: string; volume: number }) {
  execSync(`catt -d ${args.device} volume ${args.volume}`);
}
