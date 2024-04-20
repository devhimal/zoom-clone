import CallList from "@/components/ui/CallList"
import React from "react"

const Previous = () => {
  return (
    <div className="flex flex-col gap-4 text-white">
      <h1 className="font-extrabold text-xl">Previous Meetings</h1>
      <CallList type="ended" />
    </div>
  )
}

export default Previous
