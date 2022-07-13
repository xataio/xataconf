import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import { FC } from "react"
import { RegisterWithGitHub } from "../Buttons/RegisterGitHub"
import { TicketButton } from "../Buttons/TicketButton"
import { H1 } from "../Typography"

type Props = {
  initialSession: Session | null
}

export const Hero: FC<Props> = ({ initialSession }) => {
  const session = useSession()

  return (
    <div
      style={{
        backgroundImage: "url(/hero/bg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className="flex flex-col"
        style={{
          height: "calc(100vh - 56px)",
        }}
      >
        <div className="my-auto max-w-[1280px] mx-auto flex flex-col items-center gap-16 p-4 leading-none text-center">
          <video
            autoPlay
            onLoadStart={(e) => {
              e.currentTarget.playbackRate = 1.5
            }}
            playsInline
            muted
            controls={false}
            loop={false}
            className="h-40 md:h-80"
          >
            <source src="/hero/fly-in.mov" type='video/mp4; codecs="hvc1"' />
            <source src="/hero/fly-in.webm" type='video/webm; codecs="vp8"' />
          </video>
          <H1>
            A free online event celebrating serverless, databases, and developer
            tools.
          </H1>
          <div className="flex flex-wrap justify-start gap-3 mt-0">
            {session || initialSession ? (
              <TicketButton />
            ) : (
              <RegisterWithGitHub />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
