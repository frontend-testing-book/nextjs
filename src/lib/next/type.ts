import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement } from "react";
import { Err } from "../error";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: (page: ReactElement) => ReactElement;
  getPageTitle: (page: ReactElement, pageProps: P) => ReactElement;
};

export type GsspResult<T> = { data: T; err: null } | { data: null; err: Err };

export type NextPageWithGsspResult<T> = NextPageWithLayout<GsspResult<T>>;

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
