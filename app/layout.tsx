import './globals.css'
import { Nunito } from 'next/font/google'
import { Navbar} from "@/app/components/navbar/Navbar";
import { ClientOnly } from "@/app/components/ClientOnly";
// import { Modal } from "./components/modals/Modal";
import React from "react";
import { RegisterModal } from "@/app/components/modals/RegisterModal";
import { TosterProvider } from "@/app/providers/TosterProvider";


export const metadata = {
  title: 'Aribnb',
  description: 'Aribnb clone',
}

const font = Nunito({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <TosterProvider/>
          <RegisterModal/>
          {/*<Modal*/}
          {/*    actionLabel='Submit'*/}
          {/*    title={'hello'}*/}
          {/*    isOpen/>*/}
          <Navbar/>
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
