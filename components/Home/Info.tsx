import classNames from "classnames"

import { Label, StatsHeader } from "../Typography"
import { motion } from "framer-motion"
import { DEFAULT_MOTION } from "../../utils/constants"

const info = [
  {
    top: 6,
    bottom: "Speakers",
  },
  {
    top: "Free",
    bottom: "Tickets",
  },
  {
    top: "Online",
    bottom: "Location",
  },
]

export const Info = () => (
  <div className="flex items-center gap-4  flex-col mt-[160px] relative ">
    <div className="sm:flex items-center pb-[160px] border-b-[1px] border-b-white border-solid border-opacity-20 relative w-full justify-center">
      {info.map((item, index) => (
        <motion.div
          key={index}
          {...DEFAULT_MOTION({ delay: index * 0.01 })}
          className={classNames("relative")}
        >
          <div
            className={classNames(
              index !== info.length - 1 &&
                "sm:after:block after:hidden after:w-[1px] after:h-10 after:bg-white after:absolute after:right-0 after:bg-opacity-20",
              "flex flex-col text-center mb-6 sm:mb-0 after:top-1/2 after:-translate-y-5 ",
              index !== info.length - 1 && "sm:pr-16",
              index !== 0 && "sm:ml-16"
            )}
          >
            <StatsHeader>{item.top}</StatsHeader>
            <Label
              className={classNames(
                index === 1
                  ? "!text-devs-yellow"
                  : index === 2
                  ? "!text-devs-cyan"
                  : "text-devs-red600"
              )}
            >
              {item.bottom}
            </Label>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
)
