import { createHmac } from 'crypto';

type DeviceListResponse = {
  body: {
    deviceList: {
      deviceName: string;
      deviceId: string;
      deviceType: string;
      enableCloudService: boolean;
    }[];
  };
};

type DeviceStatusResponse = {
  body: {
    temperature: number;
    humidity: number;
  };
};

type NatureRemoDevicesResponse = {
  id: string;
  name: string;
  newest_events: {
    hu: {
      val: number;
    };
    te: {
      val: number;
    };
  };
}[];

function createHeaders(): HeadersInit {
  const token = process.env.SWITCH_BOT_TOKEN || '';
  const secret = process.env.SWITCH_BOT_SECRET || '';
  const nonce = 'requestID';
  const t = String(Date.now());
  const data = token + t + nonce;
  const signTerm = createHmac('sha256', secret)
    .update(Buffer.from(data, 'utf-8'))
    .digest();
  const sign = signTerm.toString('base64');

  return {
    Authorization: token,
    sign: sign,
    nonce: nonce,
    t: t,
    'Content-Type': 'application/json',
  };
}

function createNatureRemoAPIHeaders(): HeadersInit {
  const token = process.env.NATURE_REMO_TOKEN || '';
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchDeviceList(): Promise<DeviceListResponse> {
  const headers = createHeaders();
  const res = await fetch('https://api.switch-bot.com/v1.1/devices', {
    headers,
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json() as Promise<DeviceListResponse>;
}

export async function fetchDeviceStatus(
  deviceId: string
): Promise<DeviceStatusResponse> {
  const headers = createHeaders();
  const res = await fetch(
    `https://api.switch-bot.com/v1.1/devices/${deviceId}/status`,
    {
      headers,
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json() as Promise<DeviceStatusResponse>;
}

export async function fetchNatureRemoDevices(): Promise<NatureRemoDevicesResponse> {
  const headers = createNatureRemoAPIHeaders();
  const res = await fetch('https://api.nature.global/1/devices', {
    headers,
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json() as Promise<NatureRemoDevicesResponse>;
}
