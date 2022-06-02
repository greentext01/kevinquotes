import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      admin: boolean,
    } & DefaultSession["user"]
  }
}
