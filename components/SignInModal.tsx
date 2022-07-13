import { Dialog } from "@headlessui/react"
import { Register } from "./Buttons/Register"

export default function SignInModal() {
  return (
    <div className="grid gap-4">
      <div className="grid w-full gap-2 text-center">
        <Dialog.Title
          as="h3"
          className="flex flex-col items-center w-full text-2xl font-bold"
        >
          Register to attend XataConf for Free
        </Dialog.Title>
        <p className="text-sm">
          We are honored to have you be a part of our event, and we&apos;re
          looking forward to serving you some amazing content. Sign in with one
          of these services to complete your registration.
        </p>
      </div>
      <div className="grid gap-4 sm:gap-2 sm:grid-cols-3">
        <Register with="github" />
        <Register with="twitter" />
        <Register with="google" />
      </div>
    </div>
  )
}
