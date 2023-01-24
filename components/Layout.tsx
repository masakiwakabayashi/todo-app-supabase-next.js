import { VFC, ReactNode } from 'react'
import Head from 'next/head'
// import { BadgeCheckIcon } from '@heroicons/react/solid'
type Title = {
  title: string
  children: ReactNode
}

// これってコンポーネントの型
export const Layout: VFC<Title> = ({ children, title = 'Todo app' }) => {
  return (
    <div className='flex min-h-screen flex-col item-center text-center font-mono text-gray-800'>
      <Head>
        <title>{title}</title>
      </Head>
      <header></header>
      <main className='flex w-screen flex-1 flex-col item-center justify-center'>
        {children}
      </main>
      {/* 次フッターのclassName */}
      <footer className='flex h-12 w-full item-center justify-center border-t'>


      </footer>
    </div>
  )
}




