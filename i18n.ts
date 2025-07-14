import { getUserLocale } from "@/services/locale"
import { getRequestConfig } from "next-intl/server"

export type Locale = (typeof locales)[number]

export const locales = ["en", "al"] as const
export const defaultLocale: Locale = "al"

export default getRequestConfig(async () => {
  const locale = await getUserLocale()

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
