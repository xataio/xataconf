import { GetServerSideProps } from "next"
import { Session } from "next-auth"
import { getSession } from "next-auth/react"

const RedirectPage = () => null

export default RedirectPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = (await getSession({ req })) as Session & {
    user: { username: string }
  }
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: `/tickets/${session?.user?.username}`,
      },
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  }
}
