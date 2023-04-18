import type { ReactNode } from 'react'
import 'tailwindcss/tailwind.css'

interface Props {
  children: ReactNode
}

export default function Layout ({
  children
}: Props) {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Clone Chat gpt</title>
      </head>
      <body className="bg-stone-950 text-white">
        <main>
          {children}
        </main> 
      </body>
    </html>
  )
}
