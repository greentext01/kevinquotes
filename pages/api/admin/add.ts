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

  if (!body.email) {
    return res.status(400).json({ message: "Missing email" });
  }

  if (typeof body.email !== "string") {
    return res.status(400).json({ message: "Email must be a string" });
  }

  try {
    await prisma.user.update({
      where: {
        email: body.email,
      },
      data: {
        admin: true,
      },
    });
  } catch (e) {
    return res.status(404).json({ message: "User not found" });
  }

  res.redirect("/?message=Admin%20added");
};

export default handler;
