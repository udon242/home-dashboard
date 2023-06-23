import MeterCard from '@/app/_components/MeterCard';
import PageTitle from '@/app/_components/PageTitle';
import { getMeter } from '@/app/service';
import { Container, Grid, GridItem } from '@/styled-system/jsx';

export const revalidate = 5;

export type Meter = {
  deviceName: string;
  deviceId: string;
  deviceType: string;
  temperature: number;
  humidity: number;
};

export default async function Switchbot() {
  const meters = await getMeter();
  return (
    <main>
      <Container paddingX={2}>
        <PageTitle>デバイス一覧</PageTitle>
        <Grid columns={{ base: 2, sm: 3 }} gap={4}>
          {meters.map((device: Meter) => {
            return (
              <GridItem key={device.deviceId}>
                <MeterCard {...device} />
              </GridItem>
            );
          })}
        </Grid>
      </Container>
    </main>
  );
}
