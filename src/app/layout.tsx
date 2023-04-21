import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import ToasterSonner from 'components/ToasterSonner'
import { Inter } from 'next/font/google'
import { ApiKeyProvider } from 'context/apiKey'
import 'tailwindcss/tailwind.css'

interface Props {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin']
})

export default function Layout ({
  children
}: Props) {
  return (
    <html className="dark">
      <body className="dark:bg-stone-950 dark:text-white text-sm" style={inter.style}>
        <ToasterSonner />
        <main>
          <ApiKeyProvider>
            {children}
          </ApiKeyProvider>
        </main> 
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Clone Chat gpt',
  icons: {
    icon: '/favicon.ico'
  },
  viewport: 'width=device-width, initial-scale=1.0'
}