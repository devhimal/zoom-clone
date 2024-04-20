import React, { ReactNode } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MeetingModalProps {
  isOpen: boolean
  isClose: any
  title: string
  buttonTxt?: string
  handleClick?: any
  image?: any
  buttonIcons?: any
  children?: ReactNode
}

const MeetingModal = ({
  isOpen,
  isClose,
  title,
  buttonTxt,
  handleClick,
  buttonIcons,
  children,
  image,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={isClose}>
      <DialogContent className="bg-dark-2 outline-none border-none text-[#fff] ">
        <div
          className={cn("flex flex-col  gap-8 outline-none border-none", {
            "items-center": buttonIcons,
          })}
        >
          <h2 className="text-xl font-extrabold">{title}</h2>
          {image ? (
            <Image src={image} width={50} height={50} alt={title} />
          ) : (
            ""
          )}
          {children}
          <Button
            className="bg-blue-1 flex gap-2 outline-none hover:bg-blue-1 focus:outline-none py-2  w-full"
            onClick={handleClick}
          >
            {buttonIcons ? (
              <Image src={buttonIcons} width={20} height={20} alt={title} />
            ) : (
              ""
            )}
            {buttonTxt || "Start meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MeetingModal
