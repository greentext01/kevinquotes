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

  if (!body.owner) {
    return res.status(400).json({ message: "Missing owner" });
  }

  if (typeof body.owner !== "string") {
    return res.status(400).json({ message: "owner must be a string" });
  }

  try {
    await prisma.quote.update({
      where: {
        id: parseInt(body.id),
      },
      data: {
        owner: {
          connect: {
            email: body.owner,
          },
        },
      },
    });
  } catch {
    return res.status(400).json({ message: "Invalid owner" });
  }

  return res.redirect(`/buy/${body.id}`);
};

export default handler;
