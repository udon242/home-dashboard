export type CATTTopic = 'catt';

export type CATTMessage = CATTCastMessage | CATTStopMessage | CATTVolumeMessage;
export type CATTCastMessage = {
  action: 'cast';
  duration: number;
};
export type CATTStopMessage = {
  action: 'stop';
};
export type CATTVolumeMessage = {
  action: 'volume';
  volume: number;
};
