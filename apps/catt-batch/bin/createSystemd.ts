import { program } from 'commander';
import { writeFileSync } from 'fs';

program
  .requiredOption('--workDir <workDir>', 'working directory')
  .requiredOption('--device <device>', 'デバイス名 or IPアドレス')
  .requiredOption('--url <url>', 'URL');
program.parse(process.argv);
const opts = program.opts();

const systemd = `
[Unit]
Description=CATT batch daemon
After=network.target

[Service]
ExecStart=pnpm start
Restart=always
User=pi
# Note Debian/Ubuntu uses 'nogroup', RHEL/Fedora uses 'nobody'
Group=nogroup
WorkingDirectory=${opts.workDir}
Environment=PATH=/usr/bin:/usr/local/bin:~/.local/bin
Environment=CATT_DEVICE=${opts.device}
Environment=CATT_CAST_URL=${opts.url}

[Install]
WantedBy=multi-user.target
`;

console.info(systemd);

writeFileSync('/etc/systemd/system/catt-batch.service', systemd);
