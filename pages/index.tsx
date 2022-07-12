import { GetServerSideProps, GetStaticProps } from "next"
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
}

export default function IndexPage({ speakers, organizers }: Props) {
  return (
    <Layout>
      <Hero />
      <Info />
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
  await basicAuthCheck(req, res)

  /**
   * @todo reconsider when https://github.com/xataio/client-ts/issues/427 is closed
   */
  const speakers = Array.from(await client.db.speakers.getMany())
  const organizers = Array.from(await client.db.organizers.getMany())

  return {
    props: { speakers, organizers },
  }
}
