import { NextauthUserRecord } from "../../xata"
import { GitHub } from "../Icons"
import { AvatarBorder } from "./AvatarBorder"

export const User = ({ user }: { user: NextauthUserRecord }) => (
  <>
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
    <div className="flex items-center justify-center gap-2 mt-2">
      <GitHub width={14} height={14} className="text-slate-500" />
      <a href={`https://github.com/${user.username}`}>
        <h6 className="text-slate-500">{user.username}</h6>
      </a>
    </div>
  </>
)
