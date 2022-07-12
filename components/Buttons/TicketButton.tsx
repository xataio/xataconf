import { useSession } from "next-auth/react"

import { Session } from "../../utils/types"
import { TicketIcon } from "../Icons"
import { SecondaryButton } from "./Secondary"

export const TicketButton = () => {
  const { data: session } = useSession()

  return (
    <SecondaryButton href={`/tickets/${session?.user?.email}`}>
      <TicketIcon />
      <span className="hidden sm:inline">My Ticket</span>{" "}
    </SecondaryButton>
  )
}
