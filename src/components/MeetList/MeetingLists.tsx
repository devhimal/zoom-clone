"use client"

import React, { useState } from "react"
import ListCard from "./ListCard"
import MeetingModal from "./MeetingModal"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "../ui/textarea"
import ReactDatePicker from "react-datepicker"
import { Input } from "../ui/input"

const MeetingLists = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<
    "isSchedule" | "isJoining" | "isInstant"
  >()
  const [meetingValues, setMeetingValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  })
  const [callDetails, setCallDetails] = useState<Call>()

  const client = useStreamVideoClient()
  const { user } = useUser()

  const createMeeting = async () => {
    if (!client || !user) return

    try {
      if (!meetingValues.dateTime) {
        toast({
          title: "Please selected a meeting date and time",
        })
        return
      }
      const id = crypto.randomUUID()
      const Call = client.call("default", id)

      if (!Call) throw new Error("failed to create a call")

      const startAt =
        meetingValues.dateTime.toISOString() ||
        new Date(Date.now()).toISOString()

      const description = meetingValues.description || "Instant Meeting"

      await Call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      })

      setCallDetails(Call)

      if (!meetingValues.description) {
        router.push(`/meeting/${Call.id}/`)
      } else {
        console.log("There is a description set")
      }

      toast({
        title: "Meeting created successfully",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed to create meeting",
      })
    }
  }

  const meetinglink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-[#fff]">
      <ListCard
        url={"/icons/add-meeting.svg"}
        title={"New Meeting"}
        desc={"Setup a new meeting"}
        classNames={"bg-orange-1"}
        handleClick={() => setMeetingState("isInstant")}
      />
      <ListCard
        url={"/icons/join-meeting.svg"}
        title={"Join Meeting"}
        desc={"Join meet"}
        classNames={"bg-sky-1"}
        handleClick={() => setMeetingState("isJoining")}
      />
      <ListCard
        url={"/icons/schedule.svg"}
        title={"Schedule Meeting"}
        desc={"Plan your meeting"}
        classNames={"bg-lightpurple-1"}
        handleClick={() => setMeetingState("isSchedule")}
      />
      <ListCard
        url={"/icons/recordings.svg"}
        title={"View Recordings"}
        desc={"Meeting recordings"}
        classNames="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />

      {/* modal to schedule meeting */}
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isSchedule"}
          isClose={() => setMeetingState(undefined)}
          title="Schedule a meeting "
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Add a description</label>
            <Textarea
              className="bg-dark-1 outline-none border-none focus-visible:ring-o focus-visible:ring-offset-0"
              onChange={(e) => {
                setMeetingValues({
                  ...meetingValues,
                  description: e.target.value,
                })
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Select a date and time</label>
            <ReactDatePicker
              selected={meetingValues.dateTime}
              onChange={(date: Date) =>
                setMeetingValues({ ...meetingValues, dateTime: date })
              }
              showTimeSelect
              timeFormat="HH:mm"
              timeCaption="Time"
              dateFormat={"MMMM d, YYYY h:mm aa"}
              className="rounded-md py-2 px-2 outline-none border-none focus-visible:ring-o focus-visible:ring-offset-0 bg-dark-1"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isSchedule"}
          isClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          buttonTxt="Copy meeting link"
          handleClick={() => {
            navigator.clipboard.writeText(meetinglink)
            toast({ title: "link copied" })
          }}
          image="/icons/checked.svg"
          buttonIcons="/icons/copy.svg"
        />
      )}

      {/* for joining instant meeting */}
      <MeetingModal
        isOpen={meetingState === "isInstant"}
        isClose={() => setMeetingState(undefined)}
        title="Start a meeting "
        buttonTxt="Start Meeting"
        handleClick={createMeeting}
      />

      {/* join meeting */}
      <MeetingModal
        isOpen={meetingState === "isJoining"}
        isClose={() => setMeetingState(undefined)}
        title="Join meeting via link "
        buttonTxt="Join meeting"
        handleClick={() => router.push(meetingValues.link)}
      >
        <Input
          className="bg-dark-1 outline-none border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:focus:ring-offset-0 "
          onChange={(e) =>
            setMeetingValues({ ...meetingValues, link: e.target.value })
          }
        />
      </MeetingModal>
    </div>
  )
}

export default MeetingLists
