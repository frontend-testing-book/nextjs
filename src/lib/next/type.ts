import { Err } from '../error';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout: (page: ReactElement) => ReactElement;
  getPageTitle: (page: ReactElement, pageProps: P) => ReactElement;
};

export type GsspResult<T> = { data: T; err: null } | { data: null; err: Err };

export type NextPageWithGsspResult<T> = NextPageWithLayout<GsspResult<T>>;

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
