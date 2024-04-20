"use server"

import { currentUser } from "@clerk/nextjs/server"
import { StreamClient } from "@stream-io/node-sdk"

const api = process.env.NEXT_PUBLIC_STREAM_API_KEY
const streamSecrete = process.env.STREAM_SECRETE_KEY

export const tokenProvider = async () => {
  const user = await currentUser()

  if (!user) throw new Error("there is no user logged in")
  if (!api) throw new Error("There is no api key provided")
  if (!streamSecrete) throw new Error("There is no secrete key provided")

  const client = new StreamClient(api, streamSecrete, { timeout: 3000 })

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60
  const issue = Math.floor(Date.now() / 1000) - 60
  const token = client.createToken(user.id, exp, issue)

  return token
}
