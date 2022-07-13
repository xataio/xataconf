import classNames from "classnames"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, useState } from "react"

import { Register } from "../../components/Buttons/Register"
import { SecondaryButton } from "../../components/Buttons/Secondary"
import { LinkIcon, TwitterIcon } from "../../components/Icons"
import Layout from "../../components/layout"
import { Ticket } from "../../components/Tickets"
import {
  Label,
  MotionH2,
  MotionSubHeadlineLarge,
} from "../../components/Typography"
import { motion } from "framer-motion"
import { DEFAULT_MOTION, name, url } from "../../utils/constants"
import { NextauthUserRecord, XataClient } from "../../xata"
import { Session } from "next-auth"
import { shuffle } from "lodash-es"

type Props = {
  user: NextauthUserRecord
  session: Session | null
  speakers: string[]
}

const UserTicket: FC<Props> = ({ user, session, speakers }) => {
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const isTicketHolder =
    session &&
    session.user &&
    (session.user as Session & { username: string }).username ===
      router.query.username

  const [firstName] = (user.name || "").split(" ")
  const imageUrl = `${url}/api/og?name=${user.name}&username=${user.username}&image=${user.image}`

  const copyToClipboard = async () => {
    // @ts-ignore
    await navigator.clipboard.writeText(window.location)
    setCopied(true)
    window.setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const tweetCopy =
    encodeURIComponent(`I'm attending #XataConf and here's my ticket! Join me in celebrating serverless, databases, and developer tools with ${speakers.join(
      ", "
    )} and more.

`)

  return (
    <Layout initialSession={session} noFooter>
      <Head>
        <title>XataConf | {firstName}&apos;s Ticket</title>
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:image" content={imageUrl}></meta>
        <meta name="image" content={imageUrl}></meta>
        <meta itemProp="image" content={imageUrl}></meta>
      </Head>

      <div className="relative flex flex-col items-center h-full min-h-screen gap-8 mt-20 z-1 sm:min-h-0">
        <div
          className={classNames(
            " max-w-full",
            isTicketHolder ? "w-[450px]" : "w-[610px]"
          )}
        >
          <MotionH2 {...DEFAULT_MOTION()} className="text-center">
            {isTicketHolder
              ? "Congratulations, you are registered!"
              : `${user.username} is attending ${name}!`}
          </MotionH2>

          <MotionSubHeadlineLarge
            {...DEFAULT_MOTION({ delay: 0.2 })}
            className="pt-4 !text-devs-gray100 text-center"
          >
            {isTicketHolder
              ? ` We are delighted that you will be joining us for ${name}.`
              : `${name} is a free, online conference with the goal to celebrate databases, serverlesss, and developer tools. `}
          </MotionSubHeadlineLarge>
        </div>
        {isTicketHolder ? (
          <motion.div
            {...DEFAULT_MOTION({ delay: 0.2 })}
            className="flex items-start gap-3 mb-12"
          >
            <SecondaryButton
              href={`https://twitter.com/intent/tweet?text=${tweetCopy}&url=${url}/tickets/${user.username}`}
              outsideWebsite
              target="_blank"
              rel="noreferrer"
            >
              <TwitterIcon />
              Share on Twitter
            </SecondaryButton>
            <div className="relative">
              <SecondaryButton onClick={copyToClipboard}>
                <LinkIcon />
                Copy link
              </SecondaryButton>
              {copied && (
                <Label className="text-center w-full !text-devs-gray100 pt-2 absolute">
                  Link Copied!
                </Label>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            {...DEFAULT_MOTION({ delay: 0.2 })}
            className="flex items-center gap-3 mb-12"
          >
            <Register />
            <Link href="/">
              <a className="block text-devs-yellow hover:underline">
                {" "}
                Learn more
              </a>
            </Link>
          </motion.div>
        )}
        <motion.div
          className="pb-20 sm:pb-0"
          {...DEFAULT_MOTION({ delay: 0.4 })}
        >
          <Ticket user={user} />
        </motion.div>
      </div>
    </Layout>
  )
}

const client = new XataClient()

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
  req,
}) => {
  const { username } = query
  const session = await getSession({ req })
  const ticket = await client.db.tickets
    .filter({ "user.username": String(username) })
    .select(["user.*"])
    .getFirst()
  const speakers = Array.from(await client.db.speakers.getMany())

  const user = ticket?.user

  if (!user) {
    return { notFound: true }
  }

  return {
    props: {
      user,
      session,
      speakers: shuffle(speakers)
        .filter((s) => s.twitter)
        .slice(0, 3)
        .map((s) => `@${s.twitter?.split("/").slice(-1)[0]}`),
    },
  }
}

export default UserTicket
