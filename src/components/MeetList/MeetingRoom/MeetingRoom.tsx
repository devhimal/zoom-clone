"use client"
import { cn } from "@/lib/utils"
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk"
import React, { useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, User, Users } from "lucide-react"
import { useSearchParams } from "next/navigation"
import EndCallButton from "../EndCallButton/EndCallButton"

type CallLayoutType = "grid" | "speaker-left" | "speaker-right"

const MeetingRoom = () => {
  const searchParams = useSearchParams()
  const isPersonRoom = !!searchParams.get("personal")
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left")
  const [showParticipants, setShowparticipants] = useState(false)

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout /> || "hello this is grid <br />"
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition={"right"} />
      default:
        return <SpeakerLayout participantsBarPosition={"left"} />
    }
  }

  return (
    <div className="w-full overflow-hidden text-white  py-4 px-4 relative">
      <h1>Meeting Room</h1>
      <div className="size-full relative flex justify-center items-center  ">
        <div className="max-w-[1000px] size-full  flex items-center ">
          <CallLayout />
        </div>
        <div
          className={cn(
            "h-[calc(100vh-86px)] hidden ml-2 bg-dark-1 py-4 px-4 rounded-md",
            {
              "show-block": showParticipants,
            }
          )}
        >
          <CallParticipantsList onClose={() => setShowparticipants(false)} />
        </div>

        <div className="fixed flex flex-wrap bottom-0 w-full items-center justify-center gap-4">
          <CallControls />

          <DropdownMenu>
            <div className="flex items-center ">
              <DropdownMenuTrigger className="cursor-pointer rounded-md bg-dark-1 px-2 py-2 hover:bg-[#4c535b]">
                <LayoutList size={20} className="text-white" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
              {["grid", "speaker-right", "speaker-left"].map(
                (layout: string, index: number) => {
                  return (
                    <DropdownMenuItem
                      className="capitalize py-4 px-2 "
                      key={index}
                      onClick={() => {
                        setLayout(layout.toLowerCase() as CallLayoutType)
                      }}
                    >
                      {layout}
                    </DropdownMenuItem>
                  )
                }
              )}
              {/* <DropdownMenuSeparator /> */}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button
            onClick={() => {
              setShowparticipants((prev) => !prev)
            }}
          >
            <div className="cursor-pointer rounded-md bg-dark-1 px-2 py-2 hover:bg-[#4c535b]">
              <Users size={20} className="text-white" />
            </div>
          </button>
          {!isPersonRoom && <EndCallButton />}
        </div>
      </div>
    </div>
  )
}

export default MeetingRoom
