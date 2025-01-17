import { FC, useEffect, useRef } from "react"
import { MobileTicketSVG } from "./MobileTicketBG"
import { TicketBG } from "./TicketSVG"
import VanillaTilt from "vanilla-tilt"
import { date } from "../../utils/constants"
import { Logo } from "../Logo"
import { NextauthUser } from "../../xata"
import { User } from "./User"

type Props = {
  user: NextauthUser
}

export const Ticket: FC<Props> = ({ user }) => {
  const wrapper = useRef()
  useEffect(() => {
    if (wrapper.current) {
      VanillaTilt.init(wrapper?.current, { scale: 1.04 })
    }
  }, [])

  return (
    <div
      className={`relative cursor-pointer m-auto  lg:block sm:h-[219px] h-[570px] w-full sm:ml-[-277px] ml-[-163px]`}
      style={{
        maxWidth: "100%",
        paddingLeft: "50%",
      }}
    >
      <div
        className="absolute transform ticket" // @ts-ignore
        ref={wrapper}
      >
        <div className="top-8 left-8 absolute sm:w-[52%]">
          <div className="flex items-center w-full md:justify-center">
            <Logo />
          </div>
          <div className="flex flex-col md:items-center">
            <span className="block mb-2 text-devs-yellow">
              {Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date)}
            </span>
            <span className="mt-4 text-lg font-bold">
              Free Online Event Celebrating Serverless, Databases, and Developer
              Tools
            </span>
          </div>
        </div>
        <div
          className="right-0 w-[35%] flex-col absolute top-12 hidden sm:block"
          style={{ transform: "translateZ(20px)" }}
        >
          <User user={user} />
        </div>

        <TicketBG />
        <MobileTicketSVG />
        <div className="absolute flex-col items-center justify-center block w-full -translate-x-1/2 bottom-12 left-1/2 sm:hidden">
          <User user={user} />
        </div>
      </div>
    </div>
  )
}
