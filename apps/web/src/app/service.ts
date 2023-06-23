import { Meter as UIMeter } from '@/app/page';
import {
  fetchDeviceList,
  fetchDeviceStatus,
  fetchNatureRemoDevices,
} from '@/app/repository';

export async function getMeter(): Promise<UIMeter[]> {
  const uiMeters: UIMeter[] = [];
  const natureRemoDeviceResponse = await fetchNatureRemoDevices();
  const meter = natureRemoDeviceResponse.find((device) =>
    Boolean(device.newest_events.te)
  );
  if (meter) {
    uiMeters.push({
      deviceId: meter.id,
      deviceName: meter.name,
      deviceType: '',
      temperature: meter.newest_events.te.val,
      humidity: meter.newest_events.hu.val,
    });
  }

  const deviceListResponse = await fetchDeviceList();
  const meterList = deviceListResponse.body.deviceList.filter((device) =>
    ['Meter', 'Hub 2'].includes(device.deviceType)
  );
  const switchBotMeters = await Promise.all(
    meterList.map(async (meter) => {
      const deviceStatus = await fetchDeviceStatus(meter.deviceId);
      const uiMeter: UIMeter = {
        deviceId: meter.deviceId,
        deviceName: meter.deviceName,
        deviceType: meter.deviceType,
        temperature: deviceStatus.body.temperature,
        humidity: deviceStatus.body.humidity,
      };
      return uiMeter;
    })
  );
  return uiMeters.concat(switchBotMeters);
}

export function isOverTemperature(meter: UIMeter) {
  return meter.temperature > 26.5;
}

export function isOverHumidity(meter: UIMeter) {
  return meter.humidity > 60;
}
