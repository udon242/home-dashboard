import {createHmac} from 'crypto';
import styles from './page.module.css'

async function getData() {
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

export default async function Switchbot() {
  const data = await getData()
  console.log(data.body)
  return (
    <main className={styles.main}>
      <p>
        <h2>デバイス一覧</h2>
        <ul>
          {data.body.deviceList.map((device: { deviceName: string }) => {
            return (
              <li>{device.deviceName}</li>
            )
          })}
        </ul>
      </p>
    </main>
  )
}
