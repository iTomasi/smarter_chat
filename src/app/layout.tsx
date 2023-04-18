import type { ReactNode } from 'react'
import ToasterSonner from 'components/ToasterSonner'
import 'tailwindcss/tailwind.css'

interface Props {
  children: ReactNode
}

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
      <body className="dark:bg-stone-950 dark:text-white">
        <ToasterSonner />
        <main>
          {children}
        </main> 
      </body>
    </html>
  )
}
