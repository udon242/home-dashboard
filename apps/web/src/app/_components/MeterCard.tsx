import { Meter } from '@/app/page';
import { isOverHumidity, isOverTemperature } from '@/app/service';
import { css } from '@/styled-system/css';
import { Box, HStack } from '@/styled-system/jsx';

const MeterCard: React.FC<Meter> = (meter) => (
  <HStack
    alignItems={'flex-start'}
    justifyContent={'space-between'}
    borderWidth={1}
    borderRadius={8}
    borderColor={'#7A7A7A'}
    padding={4}
    height={'full'}
  >
    <Box>
      <h3 className={css({ fontWeight: 'bold' })}>{meter.deviceName}</h3>
      <Box color={isOverTemperature(meter) ? '#CD2B2B' : '#B5B5B5'}>
        {meter.temperature}℃
      </Box>
      <Box color={isOverHumidity(meter) ? '#CD2B2B' : '#B5B5B5'}>
        {meter.humidity}%
      </Box>
    </Box>
  </HStack>
);
export default MeterCard;
