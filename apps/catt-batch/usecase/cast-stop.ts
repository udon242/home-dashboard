import { execSync } from 'child_process';

export async function castStop(args: { device: string }) {
  execSync(`catt -d ${args.device} stop`);
}
