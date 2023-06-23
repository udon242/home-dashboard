import {createHmac} from 'crypto';

export function createHeaders(): HeadersInit {
  const token = process.env.SWITCH_BOT_TOKEN || '';
  const secret = process.env.SWITCH_BOT_SECRET || '';
  const nonce = 'requestID';
  const t = String(Date.now());
  const data = token + t + nonce;
  const signTerm = createHmac('sha256', secret)
    .update(Buffer.from(data, 'utf-8'))
    .digest();
  const sign = signTerm.toString("base64");

  return {
    'Authorization': token,
    'sign': sign,
    'nonce': nonce,
    't': t,
    'Content-Type': 'application/json'
  }
}