import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { appUrl } from "@/contants/consts";
import { GeistSans } from "geist/font/sans";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(appUrl),
  title: "Asolution Accounts",
  description: "Kick off your business with ASolutions",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  return (
    <html lang='en' className={GeistSans.className}>
      <NextIntlClientProvider messages={messages}>
        <TooltipProvider>
          <body className='bg-background text-foreground'>
            <main className='min-h-screen flex flex-col'>{children}</main>
          </body>
          <Toaster />
        </TooltipProvider>
      </NextIntlClientProvider>
    </html>
  );
}
