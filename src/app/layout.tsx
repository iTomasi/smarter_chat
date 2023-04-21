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
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Clone Chat gpt</title>
      </head>
      <body className="dark:bg-stone-950 dark:text-white" style={inter.style}>
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
