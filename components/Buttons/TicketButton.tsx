import { Session } from "next-auth"
import { useSession } from "next-auth/react"

import { TicketIcon } from "../Icons"
import { Register } from "./Register"
import { SecondaryButton } from "./Secondary"

export const TicketButton = () => {
  const { data: session, status } = useSession()

  return status === "authenticated" && session && session.user ? (
    <SecondaryButton
      href={`/tickets/${
        (session.user as Session["user"] & { username: string }).username
      }`}
    >
      <TicketIcon />
      <span>My Ticket</span>{" "}
    </SecondaryButton>
  ) : (
    <Register />
  )
}
