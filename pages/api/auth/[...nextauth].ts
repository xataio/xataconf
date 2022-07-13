import NextAuth, { User } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import GoogleProvider from "next-auth/providers/google"
import XataAdapter from "@tejaskumar/xata-next-auth-adapter"
import { NextauthUser, XataClient } from "../../../xata"
import { snake } from "case"

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
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0",
      profile: async ({ data }) => {
        const xataRecord: NextauthUser & User & { id: string } = {
          image: data.profile_image_url,
          name: data.name,
          username: `${data.username}_tw`,
          id: data.id,
        }

        return xataRecord;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile: async (data) => {
        const xataRecord = {
          image: data.picture,
          name: data.name,
          email: data.email,
          username: `${snake(data.email)}_go`,
          id: data.sub,
        }

        return xataRecord;
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile: async (profile) => {
        return {
          username: `${profile.login}_gh`,
          location: profile.location,
          id: profile.id?.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
  ],
})
