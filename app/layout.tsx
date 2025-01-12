import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { GeistSans } from 'geist/font/sans'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import './globals.css'

export const metadata = {
  title: 'Asolution Accounts',
  description: 'Kick off your business with ASolutions',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const messages = await getMessages()
  return (
    <html lang='en' className={GeistSans.className}>
      <NextIntlClientProvider messages={messages}>
        <TooltipProvider>
          <body className='min-h-screen'>{children}</body>
          <Toaster />
        </TooltipProvider>
      </NextIntlClientProvider>
    </html>
  )
}
