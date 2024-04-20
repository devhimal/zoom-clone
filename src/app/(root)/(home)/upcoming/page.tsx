import CallList from "@/components/ui/CallList"
import React from "react"

const Upcoming = () => {
  return (
    <div className="text-white flex flex-col gap-4">
      <h1 className="font-extrabold text-xl capitalize">Upcoming Meetings</h1>
      <CallList type="upcoming" />
    </div>
  )
}

export default Upcoming
