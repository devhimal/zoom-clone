import Link from "next/link"
import React from "react"
import Image from "next/image"
import MobileNav from "./MobileNav"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

const Navbar = () => {
  return (
    <nav className="fixed px-6 lg:px-10 py-4 flex-between w-full bg-dark-1 z-50">
      <Link href={"/"} className="flex  items-center gap-2">
        <Image
          src={"/icons/logo.svg"}
          height={32}
          width={32}
          alt="zoom-clone"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-semibold max-sm:hidden">Zoom Clone</p>
      </Link>
      <div className="flex-between gap-4">
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <UserButton />
          </SignedOut>
        </div>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
