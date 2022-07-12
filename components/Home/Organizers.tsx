import { motion } from "framer-motion"
import { DEFAULT_MOTION } from "../../utils/constants"
import { TwitterSmall } from "../Icons"
import { Label, MotionH2, MotionSubHeadlineLarge } from "../Typography"

import { Xatafly } from "../Xatafly"
import { OrganizerRecord } from "../../xata"
import { FC } from "react"

type Props = {
  organizers: OrganizerRecord[]
}

const motionStagger = (index: number) => ({
  ...DEFAULT_MOTION({ delay: index * 0.05 }),
})

export const Organizers: FC<Props> = ({ organizers }) => (
  <div className="flex px-4 gap-4 min-h-screen flex-col pt-[160px]">
    <div className="text-center">
      <MotionH2
        {...DEFAULT_MOTION()}
        className="flex items-center justify-center gap-4"
      >
        Organized by <Xatafly size={48} />
      </MotionH2>
    </div>
    <MotionSubHeadlineLarge
      {...DEFAULT_MOTION()}
      className="mt-5 mx-auto block text-center !text-devs-gray100 max-w-[560px]"
    >
      This event was put together by the talented{" "}
      <span className="text-white">
        <strong>Xata Developer Relations</strong>
      </span>{" "}
      team and friends.
    </MotionSubHeadlineLarge>
    <ul className="flex gap-8 flex-wrap items-center justify-center mt-[120px] mb-[160px]">
      {organizers.map((organizer, i) => (
        <motion.li
          {...motionStagger(i)}
          key={organizer.name}
          className="bg-white bg-opacity-5 rounded-md h-[180px] flex items-center justify-center flex-col relative w-[290px]"
        >
          {organizer.twitter && (
            <a
              href={organizer.twitter}
              target="_blank"
              rel="noreferrer"
              className="absolute top-6 right-6"
              aria-label={`${organizer.name} on Twitter`}
            >
              <TwitterSmall />
            </a>
          )}
          <img
            src={
              organizer.image ||
              "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
            }
            width={56}
            height={56}
            alt={organizer.name || "Organizer Avatar"}
            className="rounded-full"
          />
          <Label className=" mt-3 font-size-[14px] mb-2">
            {organizer.name}
          </Label>
          <Label className="font-light !text-[#8a8787] text-center max-w-[80%]">
            {organizer.title}
          </Label>
        </motion.li>
      ))}
    </ul>
  </div>
)
