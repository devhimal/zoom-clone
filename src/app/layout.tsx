import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/toaster"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import "react-datepicker/dist/react-datepicker.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zoom Clone",
  description: "This clone app is created by himal tamang",
  icons: "/icons/logo.svg",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "/icons/yoom-logo.svg",
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "iconButton",
        },
        variables: {
          colorText: "#fff",
          colorPrimary: "#0E78F9",
          colorBackground: "#1C1F2E",
          colorInputBackground: "#252A41",
          colorInputText: "#fff",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-dark-2 `}>
          {children}
          <Toaster exClass={"bg-dark-1 text-white"} />
        </body>
      </html>
    </ClerkProvider>
  )
}
