import './globals.css'
import { Nunito } from 'next/font/google'
import { Navbar} from "@/app/components/navbar/Navbar";
import { ClientOnly } from "@/app/components/ClientOnly";
// import { Modal } from "./components/modals/Modal";
import React from "react";
import { RegisterModal } from "@/app/components/modals/RegisterModal";
import { LoginModal } from '@/app/components/modals/LoginModal'
import { RentModal } from "@/app/components/modals/RentModal";
import { TosterProvider } from "@/app/providers/TosterProvider";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {SearchModal} from "@/app/components/modals/SearchModal";


export const metadata = {
  title: 'Aribnb',
  description: 'Aribnb clone',
}

const font = Nunito({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <TosterProvider/>
          <SearchModal />
          <RentModal/>
          <LoginModal/>
          <RegisterModal/>
          {/*<Modal*/}
          {/*    actionLabel='Submit'*/}
          {/*    title={'hello'}*/}
          {/*    isOpen/>*/}
          <Navbar
              currentUser={ currentUser }
          />
        </ClientOnly>
        <div
          className="
            pb-20
            pt-28
          "
        >
          {children}
        </div>
      </body>
    </html>
  )
}
