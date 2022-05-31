import { prisma } from "@lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // I should probably puth the admin stuff in a function but whatever
  const body = req.body;

  if (req.method !== "POST") {
    return res.status(405);
  }

  const user = await getSession({ req });
  if (!user?.user.admin) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (!body.content) {
    return res.status(400).json({ message: "Missing content" });
  }

  if (typeof body.content !== "string") {
    return res.status(400).json({ message: "Content must be a string" });
  }

  if (body.content.length > 200) {
    return res
      .redirect("/?error=Content%20must%20be%20less%20than%20200%20characters");
  }

  await prisma.quote.create({
    data: {
      quote: body.content,
    },
  });

  res.redirect("/?message=Quote%20created");
};

export default handler;
