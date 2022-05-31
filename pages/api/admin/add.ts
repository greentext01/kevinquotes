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
    return res.redirect("/?error=Not%20authenticated");
  }

  if (!body.email) {
    return res.redirect("/?error=Missing%20email");
  }

  if (typeof body.email !== "string") {
    return res.redirect("/?error=Email%20must%20be%20a%20string");
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
    return res.redirect("/?error=User%20not%20found");
  }

  res.redirect("/?message=Admin%20added");
};

export default handler;
