import prisma from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;

  if (req.method !== "POST") {
    return res.status(405);
  }

  const user = await getSession({ req });
  if (!user?.user.admin) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (!body.id) {
    return res.status(400).json({ message: "Missing id" });
  }

  if (typeof body.id !== "string") {
    return res.status(400).json({ message: "Id must have type of string" });
  }

  const id = parseInt(body.id)

  if (id === NaN) {
    return res.status(400).json({ message: "Id must be a number" });
  }

  await prisma.quote.delete({
    where: {
      id: id,
    },
  });

  res.redirect("/?message=Quote%20deleted");
}

export default handler;