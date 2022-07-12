import { motion } from "framer-motion"
import { FC } from "react"
import { DEFAULT_MOTION } from "../../utils/constants"
import { SpeakerRecord } from "../../xata"
import { SecondaryButton } from "../Buttons/Secondary"
import { TwitterSmall } from "../Icons"
import {
  H3,
  MotionH2,
  MotionSubHeadlineLarge,
  SubHeadlineXL,
  TalkName,
} from "../Typography"

type Props = {
  speakers: SpeakerRecord[]
}

const Header = () => (
  <motion.div
    {...DEFAULT_MOTION({})}
    className="mt-[160px] mb-20 sm:flex items-end justify-between"
  >
    <SubHeadlineXL className="block !text-devs-gray100 min-w-[188px] mr-[48px] shrink-0">
      <H3 className="block text-white">Speakers &amp; Talks</H3>
    </SubHeadlineXL>
    <div className="h-[1px] w-full bg-white mb-4 sm:block hidden" />
  </motion.div>
)

export const Speakers: FC<Props> = ({ speakers }) => {
  return (
    <div className="flex max-w-screen-lg px-4 mx-auto gap-4 min-h-screen flex-col pt-[160px]">
      <div className="text-center">
        <MotionH2 {...DEFAULT_MOTION()}>Speakers</MotionH2>
      </div>
      <MotionSubHeadlineLarge
        {...DEFAULT_MOTION()}
        className="mt-5 m-auto block text-center !text-devs-gray100"
      >
        Spend the day learning from{" "}
        <span className="text-white">
          <strong>engineering leaders</strong>
        </span>{" "}
        around the globe. Topics include{" "}
        <span className="text-white">
          <strong>serverless, databases, and developer tools</strong>
        </span>{" "}
        to create powerful serverless software for global impact.
      </MotionSubHeadlineLarge>
      <Header />
      <ul className="mb-28">
        {speakers.map((speaker, index) => (
          <Speaker
            key={`${speaker.name}-${speaker.image}`}
            i={index}
            speaker={speaker}
          />
        ))}
      </ul>
    </div>
  )
}
const motionStagger = (index: number) => ({
  ...DEFAULT_MOTION({ delay: index * 0.05 }),
})
const Speaker = ({ speaker, i }: { speaker: SpeakerRecord; i: number }) => {
  return (
    <motion.li
      {...motionStagger(i)}
      className="sm:flex flex-col sm:flex-row justify-between items-center mb-6 pb-6 border-b-[1px] border-opacity-20 border-dashed border-white"
    >
      <div className="flex items-center w-full">
        <button className="relative min-w-[64px] w-16  mr-6">
          <img
            src={
              speaker.image ||
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
            }
            alt={speaker.name || "Speaker's Avatar"}
            width={64}
            height={64}
            className="rounded-full"
          />
        </button>

        <div>
          <div className="flex items-center gap-3">
            <span className="font-bossa">{speaker.name}</span>
            {speaker.twitter && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="pt-1 text-devs-blue"
                href={speaker.twitter}
                aria-label={`${speaker.name} on Twitter`}
              >
                <TwitterSmall />
              </a>
            )}
          </div>
          <TalkName className="!text-devs-gray100 pt-1">
            {" "}
            {speaker.talk || "TBD"}
          </TalkName>
        </div>
      </div>
      <div className="flex sm:max-w-[70%] mt-4 sm:mt-0 gap-4 w-full items-center">
        {speaker.videoUrl && (
          <SecondaryButton
            className="justify-center w-full md:w-fit md:ml-auto"
            href={speaker.videoUrl}
            target="_blank"
            rel="noreferrer"
          >
            View talk
          </SecondaryButton>
        )}
      </div>
    </motion.li>
  )
}
