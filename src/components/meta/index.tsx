import Head from "next/head";
import { ReactElement, ReactNode } from "react";

export function PageTitle<T>(getPageTitle?: (pageProps: T) => ReactNode) {
  return function getPageTitleNode(page: ReactElement, pageProps: T) {
    return (
      <>
        <Head>
          <title>{getPageTitle?.(pageProps) || "Tech Posts"}</title>
        </Head>
        {page}
      </>
    );
  };
}
