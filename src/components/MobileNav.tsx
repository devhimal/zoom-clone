"use client"

import React from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { sidebarLinks } from "../../constants"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const MobileNav = () => {
  const pathname = usePathname()
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src={"/icons/hamburger.svg"}
            height={32}
            width={32}
            alt="hamburger"
            className="sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className="border-none bg-dark-1 ">
          <Link href={"/"} className="flex  items-center gap-2 ">
            <Image
              src={"/icons/logo.svg"}
              height={32}
              width={32}
              alt="zoom-clone"
              className="max-sm:size-10"
            />
            <p className="text-[26px] font-semibold text-white">Zoom Clone</p>
          </Link>

          <div className="flex h-[calc(100vh- 72px)] flex-col pt-14 overflow-y-auto justify-between">
            <SheetClose asChild>
              <section className="pt-16 text-white flex flex-col gap-6">
                {sidebarLinks.map((link: any) => {
                  const isActive = pathname === link.route
                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn(
                          " p-4 gap-4 flex w-full max-w-60items-center rounded-md",
                          {
                            "bg-blue-1": isActive,
                          }
                        )}
                      >
                        <Image
                          src={link.url}
                          height={24}
                          width={24}
                          alt={link.label}
                        />
                        <span className=" text-white font-semibold ">
                          {link.label}
                        </span>
                      </Link>
                    </SheetClose>
                  )
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
