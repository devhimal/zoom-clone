"use client"

import React from "react"
import { sidebarLinks } from "../../constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"

const Sidebar = () => {
  const pathname = usePathname()
  return (
    <section className="h-screen w-fit flex flex-col left-0 top-0 sticky justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link: any) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`)
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(" p-4 gap-4 flex justify-start rounded-md", {
                "bg-blue-1": isActive,
              })}
            >
              <Image src={link.url} height={24} width={24} alt={link.label} />
              <span className="text-md mt-2 font-semibold max-lg:hidden">
                {link.label}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Sidebar
