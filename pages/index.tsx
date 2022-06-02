import prisma from "@lib/db";
import { User } from "@prisma/client";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import QuoteComponent from "components/quote";
import LoadingQuote from "components/loadingQuote";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

type Props = {
  quotes: {
    quote: string;
    id: number;
    owner: User;
  }[];
};

const Home = ({ quotes }: Props) => {
  const [clientQuotes, setClientQuotes] = useState(quotes);
  const [hasMore, setHasMore] = useState(quotes.length >= 20);
  const { data, status } = useSession();
  const router = useRouter();

  async function fetchMoreData() {
    const res = await fetch(`/api/quote/get?start=${clientQuotes.length}`);

    // Set hasMore to false if no more data is available
    if (res.status === 204) {
      setHasMore(false);
      return;
    }

    const data = await res.json();

    if (!data || !Array.isArray(data)) {
      // Try again after 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      fetchMoreData();
    }

    setClientQuotes(clientQuotes.concat(data));
  }

  return (
    <>
      <h1 className="text-center text-4xl font-bold mb-4 mt-12">
        Kevin quotes
      </h1>
      <div className="flex justify-center mx-2 flex-col md:flex-row items-center md:items-start">
        <div className="flex-grow w-40 sm:flex-grow">
          <div>
            <a
              href="https://scratch.mit.edu/projects/685823787"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/carlos-ad.png"
                width="400"
                height="1000"
                alt="Carlos' ad"
              />
            </a>
          </div>
          <div>
            <Image
              src="/theo-ad.png"
              width="200"
              height="400"
              alt="Theo's ad"
            />
          </div>
          <div>
            <Image
              src="/robert-ad.png"
              width="50"
              height="50"
              alt="Robert's ad"
            />
          </div>
        </div>
        <main className="flex-grow max-w-xl">
          {data?.user.admin && (
            <>
              <Link href="/create">
                <div
                  className="py-3 px-6 bg-blue-500 text-white
              shadow-md rounded-md mx-auto mb-2 w-40 hover:cursor-pointer text-center"
                >
                  Create quote
                </div>
              </Link>
              <Link href="/addAdmin">
                <div
                  className="py-3 px-6 bg-blue-500 text-white
              shadow-md rounded-md mx-auto mb-2 w-40 hover:cursor-pointer text-center"
                >
                  Add admin
                </div>
              </Link>
            </>
          )}
          {status === "unauthenticated" ? (
            <Link href="/auth/signin">
              <div
                className="py-3 px-6 bg-blue-500 text-white
                shadow-md rounded-md mx-auto mb-8 w-40 hover:cursor-pointer text-center"
              >
                Sign in
              </div>
            </Link>
          ) : (
            <Link href="/auth/signout">
              <div
                className="py-3 px-6 bg-blue-500 text-white
              shadow-md rounded-md mx-auto mb-8 w-40 hover:cursor-pointer text-center"
              >
                Sign out
              </div>
            </Link>
          )}
          {router.query.message && (
            <div className="bg-green-500 bg-opacity-30 border border-green-400 text-green-400 text-center p-4 rounded-md mb-3 mx-6 w-100 overflow-hidden">
              {router.query.message}
            </div>
          )}
          {router.query.error && (
            <div className="bg-red-400 bg-opacity-30 border border-red-400 text-red-400 text-center p-4 rounded-md mb-3 mx-6 w-100 overflow-hidden">
              Error: {router.query.error}
            </div>
          )}
          <InfiniteScroll
            dataLength={clientQuotes.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<LoadingQuote />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>No more quotes to show!</b>
              </p>
            }
          >
            {clientQuotes.map((quote, i) => (
              <QuoteComponent
                key={i}
                quote={quote}
                admin={!!data?.user.admin}
              />
            ))}
          </InfiniteScroll>
        </main>
        <div className="flex-grow w-40"></div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const quotes = await prisma.quote.findMany({
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      quote: true,
      id: true,
      owner: true,
    },
  });

  return {
    props: {
      quotes,
    },
  };
};

export default Home;
