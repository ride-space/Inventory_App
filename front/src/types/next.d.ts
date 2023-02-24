import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';

type PageAttributes = { getLayout?: (page: ReactElement) => JSX.Element };

declare module 'next' {
  type CustomLayout = NonNullable<PageAttributes['getLayout']>;
  type CustomNextPage<P = Record<string, unknown>, IP = P> = NextPage<P, IP> &
    PageAttributes & { requireAuth?: boolean };
}

declare module 'next/app' {
  type CustomAppPage<P = Record<string, unknown>> = (
    props: AppProps<P> & {
      Component: NextPage & PageAttributes & { requireAuth?: boolean };
      pageProps: P & { session?: Session };
    },
  ) => JSX.Element;
}
