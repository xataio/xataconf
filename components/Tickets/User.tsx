import { BsGithub, BsTwitter } from "react-icons/bs"
import { NextauthUser } from "../../xata"
import { GitHub } from "../Icons"
import { AvatarBorder } from "./AvatarBorder"

export const User = ({ user }: { user: NextauthUser }) => (
  <div className="grid gap-1">
    <div className="relative h-[74px] sm:h-[64px] w-[74px] sm:w-[64px] m-auto">
      {user.image && (
        <img
          className="sm:w-[64px] sm:h-[64px] w-[74px] h-[74px] rounded-full"
          src={user.image}
          alt={user.username || "User's Avatar"}
        />
      )}
      <AvatarBorder />
    </div>
    <h2 className="block w-full pt-4 text-lg leading-5 text-center">
      {user.name}
    </h2>
    {user?.username && (
      <div className="flex items-center justify-center gap-2 text-sm">
        {getUserSocialsByUsername(user.username)}
      </div>
    )}
  </div>
)

const iconProps = { size: 16, color: "#64748b" }
const getUserSocialsByUsername = (username: string) => {
  const suffix = username.slice(-2)
  const actualUsername = username.replace(suffix, "").slice(0, -1)

  console.log({ actualUsername, suffix })

  switch (suffix) {
    case "go":
      return null
    case "tw":
      return (
        <>
          <BsTwitter {...iconProps} />
          <a href={`https://twitter.com/${actualUsername}`}>
            <h6 className="text-slate-500">{actualUsername}</h6>
          </a>
        </>
      )
    case "gh":
      return (
        <>
          <BsGithub {...iconProps} />
          <a href={`https://github.com/${actualUsername}`}>
            <h6 className="text-slate-500">{actualUsername}</h6>
          </a>
        </>
      )
  }
}
