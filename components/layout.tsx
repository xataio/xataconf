import classNames from "classnames"
import { Session } from "next-auth"

import { Footer } from "./Footer"
import { Header } from "./header"

interface Props {
  children: React.ReactNode
  noFooter?: boolean
  center?: boolean
  initialSession: Session | null
}

export default function Layout({
  children,
  noFooter,
  center,
  initialSession,
}: Props) {
  return (
    <>
      <Header initialSession={initialSession} />
      <main className={classNames(center && "flex flex-col justify-center")}>
        {children}
      </main>
      {!noFooter && <Footer />}
    </>
  )
}
