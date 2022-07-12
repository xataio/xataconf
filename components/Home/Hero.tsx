import { useSession } from "next-auth/react"
import { Session } from "../../utils/types"
import { RegisterWithGitHub } from "../Buttons/RegisterGitHub"
import { TicketButton } from "../Buttons/TicketButton"
import { H1 } from "../Typography"

const width = "100%"

export const Hero = () => {
  const { data: session } = useSession() as {
    data: Session
  }

  return (
    <div
      style={{
        backgroundImage: "url(/hero/bg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          height: "calc(100vh - 56px)",
        }}
        className="max-w-[1280px] mx-auto flex flex-col items-center justify-center gap-16 p-4 leading-none text-center"
      >
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
          {session?.user?.username ? <TicketButton /> : <RegisterWithGitHub />}
        </div>
      </div>
    </div>
  )
}
