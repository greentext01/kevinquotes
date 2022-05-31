import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "@styles/global.css";
import Link from "next/link";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
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
