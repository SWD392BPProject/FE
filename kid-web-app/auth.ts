import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma/prisma";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
        clientId: "118269517149-5h32otd4abv40semaco1t6uivk2l9e8d.apps.googleusercontent.com",
        clientSecret: "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",
    })
  ],
  secret: "23u82t782y47y38r32r32ir345",
  callbacks: {
   
  },
});
