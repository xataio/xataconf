import { Hero } from "../components/Home/Hero"
import { Info } from "../components/Home/Info"
import { Organizers } from "../components/Home/Organizers"
import { Speakers } from "../components/Home/Speakers"
import { Sponsors } from "../components/Home/Sponsors"
import Layout from "../components/layout"

type Props = {}

export default function IndexPage({}: Props) {
  return (
    <Layout>
      <Hero />
      <Info />
      <Speakers />
      <Organizers />
    </Layout>
  )
}
