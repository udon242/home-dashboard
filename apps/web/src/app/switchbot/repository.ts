import {createHeaders} from '@/app/_utils/switchbotAPIUtil';

type DeviceListResponse = {
  body: {
    deviceList: {
      deviceName: string;
      deviceId: string;
      deviceType: string;
      enableCloudService: boolean;
    }[]
  }
}

type DeviceStatusResponse = {
  body: {
    temperature: number;
    humidity: number;
  }
}

export async function fetchDeviceList(): Promise<DeviceListResponse> {
  const headers = createHeaders()
  const res = await fetch('https://api.switch-bot.com/v1.1/devices', {
    headers,
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function fetchDeviceStatus(deviceId: string): Promise<DeviceStatusResponse> {
  const headers = createHeaders()
  const res = await fetch(`https://api.switch-bot.com/v1.1/devices/${deviceId}/status`, {
    headers,
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
