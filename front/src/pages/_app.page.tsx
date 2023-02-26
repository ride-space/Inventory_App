// import 'src/styles/reset.scss';
// import 'src/styles/global.scss';

import type { ColorScheme } from '@mantine/core';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import type { CustomAppPage } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { AuthGuard } from 'src/component/AuthGuard';
import { store } from 'src/store';

const App: CustomAppPage = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) => {
    return setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  };
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <SessionProvider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus
    >
      <Provider store={store}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: colorScheme,
              fontFamily: 'Montserrat,sans-self',
            }}
          >
            <NotificationsProvider>
              {Component.requireAuth ? (
                <AuthGuard>{getLayout(<Component {...pageProps} />)}</AuthGuard>
              ) : (
                getLayout(<Component {...pageProps} />)
              )}
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </Provider>
    </SessionProvider>
  );
};

export default App;
