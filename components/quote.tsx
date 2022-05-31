type Props = {
  quote: { quote: string, id: number };
  admin: boolean;
};

export default function QuoteCompoent({ quote, admin }: Props) {
  return (
    <div className="mx-6 p-5 mb-3 rounded-md bg-neutral-900 shadow-md">
      <h3 className="text-lg font-medium">{quote.quote}</h3>
      <div className="flex mt-3 justify-between">
        <p className="text-neutral-400">- Kevin</p>
        <form action="/api/quote/delete" method="post">
          <input type="hidden" name="id" value={quote.id} />
          <button className="underline text-red-400" type="submit">Delete quote</button>
        </form>
      </div>
    </div>
  );
}
