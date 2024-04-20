import CallList from "@/components/ui/CallList"
import React from "react"

const Recordings = () => {
  return (
    <div className="flex flex-col gap-4 text-white">
      <h1 className="font-extra-bold text-xl">Recordings of meeting</h1>
      <CallList type="recordings" />
    </div>
  )
}

export default Recordings
