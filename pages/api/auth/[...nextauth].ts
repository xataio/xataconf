import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import XataAdapter from "@tejaskumar/xata-next-auth-adapter"
import { XataClient } from "../../../xata"

const client = new XataClient();

export default NextAuth({
  adapter: XataAdapter(client),
  callbacks: {
    session: async ({ session, user }) => {
      const payload = { ...session, user: { ...session.user, ...user } }
      const hasTicket = await client.db.tickets.filter({ 'user.id': user.id }).getFirst();
      if (Boolean(hasTicket)) {
        return payload;
      }

      await client.db.tickets.create({
        user, createdAt: new Date()
      })
      return payload;
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          username: profile.login,
          location: profile.location,
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
  ],
})
