import { SignUp } from "@clerk/nextjs"
import React from "react"

const SignUpPage = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <SignUp />
    </main>
  )
}

export default SignUpPage
