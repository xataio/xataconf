import Link from "next/link"
import { useSession } from "next-auth/react"
import { Session } from "../utils/types"
import { Logo } from "./Logo"
import { TicketButton } from "./Buttons/TicketButton"
import { RegisterWithGitHub } from "./Buttons/RegisterGitHub"
import { motion } from "framer-motion"

const MOTION = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { delay: 0.1, duration: 0.8 },
}
export default function Header() {
  const { data: session } = useSession() as {
    data: Session
  }

  return (
    <motion.header
      {...MOTION}
      className="sticky top-0 z-20 p-4 bg-black bg-opacity-50 backdrop-blur-2xl"
    >
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className="flex flex-row items-center justify-between mx-auto ">
        <Link href="/">
          <a
            className="flex gap-2 items-end justify-center sm:justify-start sm:w-auto w-[120px]"
            aria-label="Go back home"
          >
            <Logo />
          </a>
        </Link>
        <div className="flex flex-wrap justify-start gap-3 mt-0">
          {session?.user?.username ? <TicketButton /> : <RegisterWithGitHub />}
        </div>
      </div>
    </motion.header>
  )
}
