import prisma from "../lib/db";
import { loremIpsum } from "lorem-ipsum";

async function seed() {
  const quotes = [];

  for (let i = 0; i < 100; i++) {
    quotes.push({
      quote: loremIpsum(),
    });
  }

  await prisma.quote.createMany({
    data: quotes,
  });
}

seed();
