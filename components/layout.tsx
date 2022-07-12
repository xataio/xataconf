import classNames from "classnames"
import { Footer } from "./Footer"
import Header from "./header"

interface Props {
  children: React.ReactNode
  noFooter?: boolean
  withBG?: boolean
  center?: boolean
}

export default function Layout({ children, noFooter, withBG, center }: Props) {
  return (
    <>
      <Header />
      <main className={classNames(center && "flex flex-col justify-center")}>
        {children}
      </main>
      {!noFooter && <Footer />}
    </>
  )
}
