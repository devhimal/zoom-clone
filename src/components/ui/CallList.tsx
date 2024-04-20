"use client"
import React, { useEffect, useState } from "react"
import { useGetCalls } from "../../../hooks/useGetCalls"
import { useRouter } from "next/navigation"
import { Call, CallRecording } from "@stream-io/video-react-sdk"
import MeetingCard from "../MeetingCard"
import { useToast } from "./use-toast"

const CallList = ({
  type,
}: {
  type: "upcoming" | "ended" | "recordings" | "personal-room"
}) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls()

  const [isRecording, setIsRecording] = useState<CallRecording[]>([])

  const router = useRouter()
  const { toast } = useToast()

  const getCalls = () => {
    switch (type) {
      case "upcoming":
        return upcomingCalls

      case "ended":
        return endedCalls

      case "recordings":
        return isRecording

      default:
        return []
    }
  }

  const noGetCalls = () => {
    switch (type) {
      case "upcoming":
        return "No upcoming meetings"

      case "ended":
        return "No previous meetings"

      case "recordings":
        return "No recordings available at the time"

      default:
        return []
    }
  }

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        )

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings)

        setIsRecording(recordings)
      } catch (error) {
        toast({ title: "Try Again" })
      }
    }

    if (type === "recordings") {
      fetchRecordings()
    }
  }, [type, callRecordings, toast])

  const allCalls = getCalls()
  const noAllCalls = noGetCalls()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {allCalls && allCalls?.length > 0 ? (
        allCalls.map((meeting: Call | CallRecording) => {
          console.log(meeting)
          return (
            <MeetingCard
              key={(meeting as Call).id}
              icon={
                type === "ended"
                  ? "/icons/previous.svg"
                  : type === "upcoming"
                  ? "/icons/upcoming.svg"
                  : "/icons/recordings.svg"
              }
              title={
                (meeting as Call).state?.custom.description.substring(0, 20) ||
                "No description"
              }
              date={
                (meeting as Call).state?.startsAt?.toLocaleString() ||
                (meeting as CallRecording).start_time?.toLocaleString()
              }
              isPreviousMeeting={type === "ended"}
              buttonIcon1={
                type === "recordings" ? "/icons/play.svg" : undefined
              }
              link={
                type === "recordings"
                  ? (meeting as CallRecording).url
                  : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                      (meeting as Call).id
                    }`
              }
              buttonText={type === "recordings" ? "Play" : "Start"}
              handleClick={
                type === "recordings"
                  ? () => router.push(`${(meeting as CallRecording).url}`)
                  : () => router.push(`/meeting/${(meeting as Call).id}`)
              }
            />
          )
        })
      ) : (
        <div>{noAllCalls}</div>
      )}
    </div>
  )
}

export default CallList
