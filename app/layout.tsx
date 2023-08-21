import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Login from './login'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cartalogo',
  description: 'Tu tienda digital',
  applicationName: "Cartalogo V1",

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>

    </html>
  )
}
