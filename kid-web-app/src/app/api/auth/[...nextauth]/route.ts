import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
        clientId: "118269517149-5h32otd4abv40semaco1t6uivk2l9e8d.apps.googleusercontent.com",
        clientSecret: "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",
    }),
  ],
});

export { handler as GET, handler as POST };
