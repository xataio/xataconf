import { useEffect, useRef } from "react"
import { UserType } from "../../utils/types"
import { MobileTicketSVG } from "./MobileTicketBG"
import { TicketBG } from "./TicketSVG"
import VanillaTilt from "vanilla-tilt"
import { User } from "./User"
import { getNumber } from "./utils"
import { date } from "../../utils/constants"
import { Logo } from "../Logo"

export const Ticket = (user: UserType) => {
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
        <div className="top-8 left-8 absolute w-full sm:w-[52%]">
          <div className="flex items-center justify-between w-full">
            <Logo />

            <span className="hidden underline text-devs-gray100 sm:block">
              Nº{getNumber(user.registrationNumber)}
            </span>
          </div>
          <div className="flex flex-col mt-10">
            <span className="block mb-2 text-devs-yellow">
              {Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date)}
            </span>
            <span className="text-lg">
              Online Celebration of Serverless, Databases, and Developer Tools
            </span>
          </div>
          <span className="block mt-24 underline text-devs-gray100 sm:hidden">
            {" "}
            Nº{getNumber(user.registrationNumber)}
          </span>
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
