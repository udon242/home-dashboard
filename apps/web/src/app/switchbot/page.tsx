import {FaCloud} from 'react-icons/fa'
import fetchDeviceList from '@/app/switchbot/fetchDeviceList';
import {css} from '@/styled-system/css';
import {Center, Container, Box, Grid, GridItem, HStack} from '@/styled-system/jsx';
import Link from "next/link";

type Device = {
  deviceName: string;
  deviceId: string;
  deviceType: string;
  enableCloudService: boolean;
}

export default async function Switchbot() {
  const data = await fetchDeviceList();
  console.info('fetch data: ', data.body)
  return (
    <main>
      <Container paddingX={2}>
        <Center paddingY={4}>
          <h2 className={css({fontSize: 24, fontWeight: 'bold'})}>
            デバイス一覧
          </h2>
        </Center>

        <Grid columns={{base: 2, sm: 3}} gap={4}>
          {data.body.deviceList.map((device: Device) => {
            return (
              <GridItem key={device.deviceId}>
                <Link href={`/switchbot/${device.deviceId}`}>
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
                      <h3 className={css({fontWeight: 'bold'})}>{device.deviceName}</h3>
                      <Box color={'#B5B5B5'}>{device.deviceType}</Box>
                    </Box>
                    <FaCloud color={device.enableCloudService ? '#3D3D3D' : '#D9D9D9'}/>
                  </HStack>
                </Link>
              </GridItem>
            )
          })}
        </Grid>
      </Container>
    </main>
  )
}
