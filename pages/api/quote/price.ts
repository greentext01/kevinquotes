import prisma from "@lib/db";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405);
  }

  const user = await getSession({ req });
  if (
    !(
      user?.user.email === "kevsav@claudel.org" ||
      user?.user.email === "oaudetyang@gmail.com"
    )
  ) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const body = req.body;

  if (!body.price) {
    return res.status(400).json({ message: "Missing price" });
  }

  if (typeof body.price !== "string") {
    return res.status(400).json({ message: "Price must be a string" });
  }

  const price = parseInt(body.price);
  if (isNaN(price)) {
    return res.status(400).json({ message: "Price must be a number" });
  }

  await prisma.quote.update({
    where: {
      id: parseInt(body.id),
    },
    data: {
      price,
    },
  });

  return res.redirect(`/buy/${body.id}`);
};

export default handler;
