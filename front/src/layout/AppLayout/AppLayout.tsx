import {
  AppShell,
  Burger,
  Footer,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from '@mantine/core';
import type { CustomLayout } from 'next';
import { useState } from 'react';

import { LayoutErrorBoundary } from '../LayoutErrorBoundary';
import { Nav } from './Nav';

export const AppLayout: CustomLayout = (page) => {
  const theme = useMantineTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <AppShell
        navbarOffsetBreakpoint="sm"
        navbar={<Nav opened={opened} hiddenBreakpoint="sm" setOpened={setOpened}/>}
        header={
          <Header height={70} p="md">
            <div
              style={{ alignItems: 'center', display: 'flex', height: '100%' }}
            >
              {/* sm = 768px */}
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <>
                  <Burger
                    opened={opened}
                    onClick={() => {
                      return setOpened(!opened);
                    }}
                    size="md"
                    color={theme.colors.gray[6]}
                    mt="xl"
                  />
                  <Text sx={(theme) => {
              return {
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[0]
                    : theme.black,
              };
            }}> Web DesignTuts App</Text>
                </>
              </MediaQuery>
            </div>
          </Header>
        }
        footer={
          <Footer height={60} p="md" sx={(theme) => {
            return {
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[0]
                  : theme.black,
            };
          }}>
            Application footer
          </Footer>
        }
      >
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </AppShell>
    </div>
  );
};
