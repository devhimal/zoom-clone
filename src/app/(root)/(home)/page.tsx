import MeetingLists from "@/components/MeetList/MeetingLists"
import dayjs from "dayjs"
import React from "react"

const Home = () => {
  const day = dayjs().format("dddd, MMMM-DD-YYYY")
  const time = dayjs().format("HH:mm A ")

  return (
    <section className="flex size-full flex-col gap-10">
      <div className="h-[224px] w-full bg-hero bg-cover rounded-[20px] py-8 px-8 text-[#fff]">
        <div className="rounded-md flex flex-col justify-between h-full">
          <h1 className="glassmorphism">Upcoming Meetings at 23:22pm </h1>
          <div className="flex flex-col gap-2 ">
            <h1 className="text-4xl lg:text-7xl font-extrabold">{time}</h1>
            <p className="text-sm lg:text-mg font-semibold ">{day}</p>
          </div>
        </div>
      </div>
      <div>
        <MeetingLists />
      </div>
    </section>
  )
}

export default Home
