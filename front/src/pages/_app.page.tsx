import 'src/styles/reset.scss';
import 'src/styles/global.scss';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import type { CustomAppPage } from 'next/app';
import { Provider } from 'react-redux';
import { store } from 'src/reducks/store/store';

const App: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <Provider store={store}>
      <MantineProvider>
        <NotificationsProvider>
          {getLayout(<Component {...pageProps} />)}
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  );
};

export default App;
