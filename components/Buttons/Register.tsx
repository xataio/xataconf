import classNames from "classnames"
import { signIn } from "next-auth/react"
import { FC } from "react"
import { closeModal, openModal } from "react-url-modal"
import { GitHubIcon, GoogleIcon, TwitterIcon } from "../Icons"

type Props = {
  with?: "twitter" | "github" | "google"
  className?: string
}

const className =
  "flex items-center justify-center h-10 gap-2 px-4 py-2 font-normal transition-colors rounded-md shadow bg-devs-gray200 hover:bg-devs-gray50"

export const Register: FC<Props> = (props) => {
  switch (props.with) {
    case "github":
      return (
        <button
          onClick={async () => {
            await closeModal()
            signIn("github")
          }}
          className={classNames(className, props.className)}
        >
          <GitHubIcon size={20} />
          <span>GitHub</span>
        </button>
      )
    case "google":
      return (
        <button
          onClick={async () => {
            await closeModal()
            signIn("google")
          }}
          className={classNames(className, props.className)}
          style={{ background: "#4285F4", color: "white" }}
        >
          <GoogleIcon size={20} />
          <span>Google</span>
        </button>
      )
    case "twitter":
      return (
        <button
          onClick={async () => {
            await closeModal()
            signIn("twitter")
          }}
          style={{ background: "#1DA1F2", color: "white" }}
          className={classNames(className, props.className)}
        >
          <TwitterIcon color="white" />
          <span>Twitter</span>
        </button>
      )
    default:
      return (
        <button
          onClick={() => openModal({ name: "signin" })}
          className={classNames(className, props.className)}
        >
          <span>Register</span>
        </button>
      )
  }
}
