import './globals.css'
import { Providers } from '@/redux/providers'
import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'

const inter = Poppins({weight:"400", subsets: ['latin'] })

export const metadata = {
  title: 'Breta',
  description: 'Breta Beauty',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  )
}
