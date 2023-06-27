import { execSync } from 'child_process';

execSync('sudo systemctl daemon-reload');
execSync('sudo systemctl restart catt-batch');
