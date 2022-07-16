import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "@styles/global.css";
import Link from "next/link";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Kevin quotes</title>
        <meta name="description" content="Stuff that kevin says" />
        <meta name="google-site-verification" content="8GKubJhu-eTv5gnnpQrv2D7s3Y-4DSEYKZZJY4Tuzbg" />
        <link rel="icon" href="/favicon.svg" />
        <meta name="theme-color" content="#262626" />
        <meta property="og:image" content="https://www.kevinquotes.com/favicon.svg" />
      </Head>
      <div className="bg-neutral-800 text-neutral-200 min-h-screen">
        <Link href="/">
          <div className="w-100 py-4 px-4 bg-neutral-900 text-white text-lg font-semibold hover:cursor-pointer">
            Kevin quotes
          </div>
        </Link>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
