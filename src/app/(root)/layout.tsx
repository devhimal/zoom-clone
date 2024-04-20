import { StreamVideo } from "@stream-io/video-react-sdk"
import React, { ReactNode } from "react"
import StreamVideoProvider from "../../../providers/StreamClientProvider"

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  )
}

export default RootLayout
