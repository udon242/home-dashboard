import {createHmac} from 'crypto';

export default async function fetchDeviceList() {
  const token = process.env.SWITCH_BOT_TOKEN || '';
  const secret = process.env.SWITCH_BOT_SECRET || '';
  const nonce = 'requestID';
  const t = String(Date.now());
  const data = token + t + nonce;
  const signTerm = createHmac('sha256', secret)
    .update(Buffer.from(data, 'utf-8'))
    .digest();
  const sign = signTerm.toString("base64");

  const headers: HeadersInit = {
    'Authorization': token,
    'sign': sign,
    'nonce': nonce,
    't': t,
    'Content-Type': 'application/json'
  }
  const res = await fetch('https://api.switch-bot.com/v1.1/devices', {
    headers,
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}