'use client';

import useSWR, { SWRConfig } from 'swr';

import MeterCard from '@/app/_components/MeterCard';
import { Meter } from '@/app/page';
import { Grid, GridItem } from '@/styled-system/jsx';

const API_URL = '/api/meters';

const fetcher = async (url: string) => {
  const urlObj = new URL(window.location.href);
  const token = urlObj.searchParams.get('token');
  const query = token ? `?token=${token}` : '';
  const res = await fetch(`${url}${query}`);
  return res.json() as Promise<Meter[]>;
};

const MeterListChild: React.FC = () => {
  const { data } = useSWR(API_URL, fetcher);
  return (
    <Grid columns={{ base: 2, sm: 3 }} gap={4}>
      {data?.map((device: Meter) => {
        return (
          <GridItem key={device.deviceId}>
            <MeterCard {...device} />
          </GridItem>
        );
      })}
    </Grid>
  );
};

const MeterList: React.FC<{ initialMeterList: Meter[] }> = ({
  initialMeterList,
}) => {
  return (
    <SWRConfig
      value={{
        fallback: { [API_URL]: initialMeterList },
        refreshInterval: 10000,
      }}
    >
      <MeterListChild />
    </SWRConfig>
  );
};
export default MeterList;
