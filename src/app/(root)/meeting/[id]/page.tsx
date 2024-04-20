"use client"

import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import React, { useState } from "react"
import { GetCallById } from "../../../../../hooks/getCallById"
import MeetingSetup from "@/components/MeetList/MeetingSetup/MeetingSetup"
import MeetingRoom from "@/components/MeetList/MeetingRoom/MeetingRoom"

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser()
  const [isMeetSetup, setIsMeetSetup] = useState(false)
  const { call, isCallLoading } = GetCallById(id)

  if (!isLoaded || isCallLoading) return "Loading...."
  return (
    <main className="h-fit w-full ">
      <StreamCall call={call}>
        <StreamTheme>
          {!isMeetSetup ? (
            <MeetingSetup setIsLoading={setIsMeetSetup} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting
