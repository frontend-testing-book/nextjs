import { AppPropsWithLayout } from "@/lib/next/type";
import Head from "next/head";
import "../../public/styles/globals.css";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const getPageTitle = Component.getPageTitle ?? ((page) => page);
  return getLayout(
    getPageTitle(
      <>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </>,
      pageProps
    )
  );
}

export default MyApp;
