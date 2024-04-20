"use client"

import React, { useEffect, useState } from "react"
import {
  useCall,
  DeviceSettings,
  VideoPreview,
} from "@stream-io/video-react-sdk"
import { Button } from "@/components/ui/button"

interface meetingSetupProps {
  setIsLoading: (value: boolean) => void
}

const MeetingSetup = ({ setIsLoading }: meetingSetupProps) => {
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false)
  const call = useCall()

  useEffect(() => {
    if (isMicCamToggleOn) {
      call?.camera.disable()
      call?.microphone.disable()
    } else {
      call?.camera.enable()
      call?.microphone.enable()
    }
  }, [call?.camera, call?.microphone, isMicCamToggleOn])

  return (
    <div className="bg-dark-2 w-full flex flex-col items-center justify-center gap-3 text-white">
      <h1>Meeting Setup</h1>
      <VideoPreview />
      <DeviceSettings />
      <div className="flex justify-center flex-col items-center gap-4">
        <Button
          className="flex justify-center items-center gap-2"
          onClick={(e) => setIsMicCamToggleOn(!isMicCamToggleOn)}
        >
          Join without turning on mic and camera
        </Button>

        <Button
          className="px-4 py-2 rounded-sm bg-green-500"
          onClick={() => {
            call?.join()
            setIsLoading(true)
          }}
        >
          Join Meeting
        </Button>
      </div>
    </div>
  )
}

export default MeetingSetup
