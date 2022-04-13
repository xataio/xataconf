import { Popover } from "@headlessui/react"
import { Reactions } from "@prisma/client"
import { Emoji, EmojiData, Picker } from "emoji-mart"
import { useState } from "react"
import { EmojiAdd } from "../Icons"

const EmojiButton = ({
  children,
  ...props
}: {
  children: React.ReactNode
  onClick?: () => Promise<void>
}) => (
  <button
    className="flex h-6 items-center min-w-[32px] justify-center px-2 py-1 bg-white bg-opacity-5 text-devs-gray100 hover:text-white transition rounded-[100px] hover:bg-opacity-10 gap-1 text-[11px]"
    {...props}
  >
    {children}
  </button>
)

export const EmojiPicker = ({
  reactions: initialReactions,
}: {
  reactions: Reactions[]
}) => {
  const [reactions, setReactions] = useState(initialReactions)

  const addReaction = async (reaction: any) => {
    const exists = reactions.find((r) => r.colons === reaction.colons)
    if (exists) {
      setReactions(
        reactions.map((r) => {
          if (r.colons === reaction.colons) {
            return {
              ...r,
              uses: r.uses + 1,
            }
          }
          return r
        })
      )
    } else {
      setReactions([...reactions, { ...reaction, uses: 1 }])
    }
    await fetch("/api/reactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reaction,
      }),
    })
  }

  return (
    <div className="flex gap-1 items-center mt-5">
      {reactions.map((reaction) => (
        <EmojiButton
          key={reaction.colons}
          onClick={() => addReaction(reaction)}
        >
          {/* @ts-ignore  */}
          <Emoji size={14} emoji={reaction} />
          {reaction.uses}
        </EmojiButton>
      ))}
      <Popover className="relative flex">
        <Popover.Button>
          <EmojiButton>
            <EmojiAdd />
          </EmojiButton>
        </Popover.Button>

        <Popover.Panel className="absolute z-10">
          <Picker
            set="twitter"
            theme="dark"
            emoji=""
            onSelect={addReaction}
            style={{ marginTop: 30 }}
            recent={["flag-ua", "blue_heart", "yellow_heart", "sunflower"]}
            emojisToShowFilter={(emoji: EmojiData) => {
              const toRemove = [
                "Pile of Poo",
                "Peach",
                "Pistol",
                "Aubergine",

                // flags
                "Belarus Flag",
                "Russia Flag",
              ]

              if (toRemove.includes(emoji.name)) return false

              return true
            }}
          />
        </Popover.Panel>
      </Popover>
    </div>
  )
}