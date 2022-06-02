import prisma from "@lib/db";
import { Quote } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";

type Props = {
  quote: Quote;
};

export default function Buy({ quote }: Props) {
  const { data, status } = useSession();

  return (
    <div className="mx-auto max-w-xl mt-12">
      {/* Don't buy it */}
      <h1 className="text-3xl font-semibold mb-3">
        Have your name listed on: {quote.quote}
      </h1>
      <p>
        Go ask kevin, and pay him <b>${quote.price}</b>
      </p>

      {(data?.user?.email === "kevsab@claudel.org" ||
        data?.user?.email === "oaudetyang@gmail.com") && (
        <>
          <form action="/api/quote/price" method="POST" className="mt-5">
            <input type="hidden" name="id" value={quote.id} />
            <div className="mb-4">
              <label htmlFor="price" className="font-medium">
                Change price
              </label>
              <input
                name="price"
                type="number"
                id="price"
                className="w-full p-2 rounded-md bg-neutral-900 focus:ring-0 border-0"
              />
            </div>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white
                  shadow-md rounded-md mx-auto mb-4 w-28 hover:cursor-pointer text-center"
            >
              Change
            </button>
          </form>
          <form action="/api/quote/owner" method="POST" className="mt-5">
            <input type="hidden" name="id" value={quote.id} />
            <div className="mb-4">
              <label htmlFor="owner" className="font-medium">
                Change owner
              </label>
              <input
                name="owner"
                type="email"
                id="owner"
                placeholder="Owner's email"
                className="w-full p-2 rounded-md bg-neutral-900 focus:ring-0 border-0 placeholder:text-neutral-600"
              />
            </div>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white
                  shadow-md rounded-md mx-auto w-28 hover:cursor-pointer text-center"
            >
              Change
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  if (typeof id != "string") {
    return {
      notFound: true,
    };
  }

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: { destination: "/auth/signin" },
      props: {},
    };
  }

  const intId = parseInt(id);
  if (isNaN(intId)) {
    return {
      notFound: true,
    };
  }

  const quote = await prisma.quote.findUnique({
    where: {
      id: intId,
    },
    select: {
      owner: true,
      quote: true,
      price: true,
      id: true,
    },
  });

  if (
    quote?.owner &&
    !(
      session.user.email === "kevsav@claudel.org" ||
      session.user.email === "oaudetyang@gmail.com"
    )
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      quote,
    },
  };
};
