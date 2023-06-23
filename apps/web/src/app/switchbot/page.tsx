import {css} from '@/styled-system/css';
import {Container, Box, Grid, GridItem, HStack} from '@/styled-system/jsx';
import PageTitle from '@/app/_components/PageTitle';
import {getMeter, isOverHumidity, isOverTemperature} from '@/app/switchbot/service';

export type Meter = {
  deviceName: string;
  deviceId: string;
  deviceType: string;
  temperature: number;
  humidity: number;
}

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
      <h3 className={css({fontWeight: 'bold'})}>{meter.deviceName}</h3>
      <Box color={isOverTemperature(meter) ? '#CD2B2B' : '#B5B5B5'}>{meter.temperature}℃</Box>
      <Box color={isOverHumidity(meter) ? '#CD2B2B':'#B5B5B5'}>{meter.humidity}%</Box>
    </Box>
  </HStack>
)

export default async function Switchbot() {
  const meters = await getMeter()
  return (
    <main>
      <Container paddingX={2}>
        <PageTitle>デバイス一覧</PageTitle>
        <Grid columns={{base: 2, sm: 3}} gap={4}>
          {meters.map((device: Meter) => {
            return (
              <GridItem key={device.deviceId}>
                <MeterCard {...device}/>
              </GridItem>
            )
          })}
        </Grid>
      </Container>
    </main>
  )
}
