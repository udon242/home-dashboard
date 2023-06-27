import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { program } from 'commander';

program
  .requiredOption('--workDir <workDir>', 'working directory')
  .requiredOption('--device <device>', 'デバイス名 or IPアドレス')
  .requiredOption('--url <url>', 'URL')
  .requiredOption('--mqttUserName <mqttUserName>', 'MQTT user name')
  .requiredOption('--mqttPassword <mqttPassword>', 'MQTT password')
  .requiredOption('--mqttUrl <mqttUrl>', 'MQTT url');
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
Environment=MQTT_USER_NAME=${opts.mqttUserName}
Environment=MQTT_PASSWORD=${opts.mqttPassword}
Environment=MQTT_URL=${opts.mqttUrl}

[Install]
WantedBy=multi-user.target
`;

console.info(systemd);

writeFileSync('/etc/systemd/system/catt-batch.service', systemd);
execSync('sudo systemctl daemon-reload');
execSync('sudo systemctl enable catt-batch');
execSync('sudo systemctl start catt-batch');
