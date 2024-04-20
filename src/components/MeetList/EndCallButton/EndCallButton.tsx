"use client"

import { Button } from "@/components/ui/button"
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk"
import { useRouter } from "next/navigation"
import React from "react"

const EndCallButton = () => {
  const router = useRouter()
  const call = useCall()
  const { useLocalParticipant } = useCallStateHooks()
  const localParticipant = useLocalParticipant()

  // checking who is the owner of the meeting
  const isMeetOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id

  // returning null if a meet participant is not a owner of the meeting
  if (!isMeetOwner) return null

  return (
    <>
      <Button
        onClick={async () => {
          await call?.endCall()
          router.push("/")
        }}
        className="cursor-pointer bg-red-500 hover:opacity-70 hover:bg-red-500"
      >
        End call for everyone
      </Button>
    </>
  )
}

export default EndCallButton
