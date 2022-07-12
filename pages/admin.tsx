import { Role } from "@prisma/client"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { useQuery, useQueryClient } from "react-query"
import { CheckMarkIcon, CrossIcon } from "../components/Icons"
import Layout from "../components/layout"
import { H2, H3 } from "../components/Typography"
import { getAbsoluteURL } from "../utils/absoluteUrl"
import { api } from "../utils/fetch"
import { prisma } from "../utils/prisma"
import { Session } from "../utils/types"

type Question = {
  id: string
  question: string
  userId: string
  createdAt: string
  accepted: boolean
  rejected: boolean
  User: {
    username: string
    email: string
    image: string
    name: string
  }
}

const Admin = ({
  questions,
  attendees,
}: {
  attendees: number
  questions: Question[]
}) => {
  const queryClient = useQueryClient()
  const { data } = useQuery("questions", () => api.get({ url: "questions" }), {
    initialData: questions,
  })

  const updateQuestionState = async (state: string, id: string) => {
    await api.post({
      url: "questions",
      body: {
        state,
        id,
      },
    })
    queryClient.invalidateQueries("questions")
  }

  return (
    <Layout noFooter>
      <div className="flex items-center justify-center gap-6">
        <H3 className="my-16 text-center">
          Thanks to{" "}
          <a
            className="underline text-devs-yellow"
            href="https://github.com/remoteoss/devsforukraine"
            target="_blank"
            rel="noopener noreferrer"
          >
            remote.com
          </a>{" "}
          for the code.
        </H3>
        <H3 className="text-center ">
          Attendees:{" "}
          <span className="underline text-devs-yellow">{attendees}</span>
        </H3>
      </div>
      <H2 className="my-12 text-center">Q&A</H2>

      {data.questions.accepted.length > 0 && (
        <>
          <H3 className="!text-devs-gray100 mb-6 text-center m-auto">
            Accepted
          </H3>
          <div className="grid gap-5 mt-6 mb-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data.questions.accepted.map((question: Question) => (
              <Question
                question={question}
                key={question.id}
                updateQuestionState={updateQuestionState}
              />
            ))}
          </div>
        </>
      )}
      <H3 className="!text-devs-gray100 mb-6 text-center m-auto">To Review</H3>
      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.questions.notViewed.map((question: Question) => (
          <Question
            question={question}
            key={question.id}
            updateQuestionState={updateQuestionState}
          />
        ))}
      </div>
    </Layout>
  )
}

const Question = ({
  question,
  updateQuestionState,
}: {
  question: Question
  updateQuestionState: any
}) => (
  <div className="flex flex-col h-full justify-between bg-devs-gray500 p-6 min-h-[200px] items-start rounded-lg">
    <p className="font-light">{question.question}</p>
    <div className="flex justify-between w-full">
      <div className="flex">
        {question?.User?.image && (
          <img
            className="w-6 h-6 m-auto mr-3 rounded-full"
            src={question?.User?.image}
            alt={question?.User?.name || "user"}
          />
        )}
        <div>
          <p className="text-left">{question?.User?.name}</p>
          <p className="text-left text-devs-gray100">
            @{question?.User?.username}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        {!question.rejected && (
          <button
            className="flex items-center justify-center w-8 h-8 bg-white rounded-full bg-opacity-5 hover:bg-opacity-20"
            onClick={() => updateQuestionState("rejected", question.id)}
          >
            <CrossIcon />
          </button>
        )}
        {!question.accepted && (
          <button
            className="flex items-center justify-center w-8 h-8 bg-white rounded-full bg-opacity-5 hover:bg-opacity-20"
            onClick={() => updateQuestionState("accepted", question.id)}
          >
            <CheckMarkIcon />
          </button>
        )}
      </div>
    </div>
  </div>
)

export default Admin

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = (await getSession({ req })) as Session
  const redirect = {
    redirect: {
      destination: "/",
      permanent: false,
    },
  }
  if (!session.user?.username) return redirect
  const user = await prisma?.user.findUnique({
    where: { username: session?.user.username },
  })

  const attendees = await prisma?.user.count()

  if (user?.role !== Role.ADMIN) {
    return redirect
  }

  const base = getAbsoluteURL(req)
  const questions = await fetch(`${base}/api/questions`).then((rsp) =>
    rsp.json()
  )

  return {
    props: {
      questions,
      attendees,
    },
  }
}
