import {Meter as UIMeter} from './page'
import {fetchDeviceList, fetchDeviceStatus} from '@/app/switchbot/repository';

export async function getMeter(): Promise<UIMeter[]> {
  const deviceListResponse = await fetchDeviceList();
  const meterList = deviceListResponse.body.deviceList.filter(device => ['Meter', 'Hub 2'].includes(device.deviceType));
  return await Promise.all(meterList.map(async (meter) => {
    const deviceStatus = await fetchDeviceStatus(meter.deviceId);
    const uiMeter: UIMeter = {
      deviceId: meter.deviceId,
      deviceName: meter.deviceName,
      deviceType: meter.deviceType,
      temperature: deviceStatus.body.temperature,
      humidity: deviceStatus.body.humidity,
    }
    return uiMeter;
  }))
}

export function isOverTemperature(meter: UIMeter) {
  return meter.temperature > 26.5;
}

export function isOverHumidity(meter: UIMeter) {
  return meter.humidity > 60;
}
