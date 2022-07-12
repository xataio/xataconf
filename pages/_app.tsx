import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { MotionConfig } from "framer-motion"
import { QueryClient, QueryClientProvider } from "react-query"
import { URLModal } from "react-url-modal"
import { ModalWrapper } from "../components/ModalWrapper"
import { SEO } from "../components/SEO"
import SignInModal from "../components/SignInModal"
import "./styles.css"
import ScheduleModal from "../components/ScheduleModal"

const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <MotionConfig reducedMotion="user">
          <SEO />
          <URLModal
            adapter="nextjs"
            modals={{
              signin: SignInModal,
              schedule: ScheduleModal,
            }}
            Wrapper={ModalWrapper}
          />

          <Component {...pageProps} />
        </MotionConfig>
      </SessionProvider>
    </QueryClientProvider>
  )
}
