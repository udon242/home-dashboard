import MeterList from '@/app/_components/MeterList';
import PageTitle from '@/app/_components/PageTitle';
import { getMeter } from '@/app/service';
import { css } from '@/styled-system/css';
import { Container } from '@/styled-system/jsx';

export type Meter = {
  deviceName: string;
  deviceId: string;
  deviceType: string;
  temperature: number;
  humidity: number;
};

export default async function Home() {
  const meters = await getMeter();
  return (
    <main className={css({ backgroundColor: 'white' })}>
      <Container paddingX={2}>
        <PageTitle>デバイス一覧</PageTitle>
        <MeterList initialMeterList={meters} />
      </Container>
    </main>
  );
}
