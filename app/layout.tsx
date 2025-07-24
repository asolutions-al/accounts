import { Toaster } from "@/components/ui/sonner"
import { TranslationProvider } from "@/providers"
import { Analytics } from "@vercel/analytics/next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"

export const metadata = {
  title: "Asolutions",
  description: "Menaxho biznesin tënd.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <TranslationProvider>
        <body className="flex min-h-dvh items-center justify-center">
          {children}
          <Toaster />
          <Analytics />
        </body>
      </TranslationProvider>
    </html>
  )
}
