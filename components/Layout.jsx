import React from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar'
import { Header } from "../components/Header";

import { useRouter } from 'next/router'

export const Layout = ({children}) => {

  const router = useRouter();

  return (
    <>
      <Head>
        <title>CRM Administración de clientes</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.1.2/tailwind.min.css" integrity="sha512-RntatPOhEcQEA81gC/esYoCkGkL7AYV7TeTPoU+R9zE44/yWxVvLIBfBSaMu78rhoDd73ZeRHXRJN5+aPEK53Q==" crossorigin="anonymous" />
      </Head>
     
     {router.pathname === '/login' || router.pathname === '/nuevacuenta' ? (
      <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
        {children}
      </div>
      ) : (
        <div className="min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar/>
            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-scrren p-5">
              <Header />
              {children}
            </main>
        </div>
        </div>
      )  }

    </>
  )
}
