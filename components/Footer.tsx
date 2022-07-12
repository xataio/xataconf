import Link from "next/link"
import { date } from "../utils/constants"
import { Logo } from "./Logo"
import { Label } from "./Typography"

export const Footer = () => (
  <footer className="flex items-center border-t-[1px] text-sm border-white border-opacity-10 h-[120px]">
    <div className="w-[80rem] max-w-[90%] mx-auto flex justify-between items-center">
      <div className="flex items-end gap-2">
        <Logo />
        <div className="relative top-1"></div>
      </div>
      <Label className="hidden font-bold text-center sm:block">
        {Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date)}
      </Label>
      <Link href="/code-of-conduct">
        <a className="underline text-devs-gray100">📕 Code of Conduct</a>
      </Link>
    </div>
  </footer>
)
