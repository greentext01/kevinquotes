import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Props = {
  quote: {
    quote: string;
    id: number;
    owner: User;
  };
  admin: boolean;
};

export default function QuoteCompoent({ quote, admin }: Props) {
  const { status, data } = useSession();

  return (
    <div className="mx-6 p-5 mb-3 rounded-md bg-neutral-900 shadow-md">
      <h3 className="text-lg font-medium whitespace-pre-wrap">{quote.quote}</h3>
      <div className="flex mt-3 flex-row">
        <p className="text-neutral-400 mr-auto">- Kevin</p>

        {quote.owner ? (
          <>
            {(
              data?.user.email === "kevsav@claudel.org" ||
              data?.user.email === "oaudetyang@gmail.com"
            ) ? (
              <Link href={`/buy/${quote.id}`}>
                <p className="text-neutral-600">Owned by {quote.owner.name}</p>
              </Link>
            ) : (
              <p className="text-neutral-600">
                <>Owned by {quote.owner.name}</>
              </p>
            )}
          </>
        ) : (
          <Link href={`/buy/${quote.id}`}>
            <p className="text-neutral-600">Buy quote</p>
          </Link>
        )}

        <form action="/api/quote/delete" method="post">
          <input type="hidden" name="id" value={quote.id} />
          {admin && (
            <button className="underline text-red-400 ml-3" type="submit">
              Delete quote
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
