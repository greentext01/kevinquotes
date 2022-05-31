import prisma from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let start = 0;
  if (req.query.start !== undefined) {
    start = parseInt(req.query.start as string) || 0;
  }

  const quotes = await prisma.quote.findMany({
    skip: start,
    select: {
      quote: true,
    },
    take: 10,
  });

  // Return 204 if no quotes found
  if (quotes.length === 0) {
    return res.status(204).end();
  }

  res.status(200).json(quotes);
};

export default handler;
