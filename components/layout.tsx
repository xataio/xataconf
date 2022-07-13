import classNames from "classnames"
import { Footer } from "./Footer"
import Header from "./header"

interface Props {
  children: React.ReactNode
  noFooter?: boolean
  center?: boolean
}

export default function Layout({ children, noFooter, center }: Props) {
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
