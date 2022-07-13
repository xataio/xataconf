import { getSession } from "next-auth/react"
import { Session } from "next-auth"
import { GetServerSideProps } from "next"

import { Hero } from "../components/Home/Hero"
import { Info } from "../components/Home/Info"
import { Organizers } from "../components/Home/Organizers"
import { Speakers } from "../components/Home/Speakers"
import Layout from "../components/layout"
import { OrganizerRecord, SpeakerRecord, XataClient } from "../xata"
import { basicAuthCheck } from "../utils/basicAuth"

type Props = {
  speakers: SpeakerRecord[]
  organizers: OrganizerRecord[]
  session: Session | null
}

export default function IndexPage({ speakers, session, organizers }: Props) {
  return (
    <Layout initialSession={session}>
      <Hero initialSession={session} />
      <Info
        info={[
          { top: speakers.length, bottom: "Speakers" },
          { top: "Free", bottom: "Tickets" },
          { top: "Online", bottom: "Location" },
        ]}
      />
      <Speakers speakers={speakers} />
      <Organizers organizers={organizers} />
    </Layout>
  )
}

const client = new XataClient()

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
}) => {
  basicAuthCheck(req, res)

  const speakers = await client.db.speakers.getAll()
  const organizers = await client.db.organizers.getAll()
  const session = await getSession({ req })

  return {
    props: { speakers, organizers, session },
  }
}
