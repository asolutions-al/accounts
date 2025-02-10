"use server"

import { defaultLocale, Locale } from "@/i18n"
import { cookies } from "next/headers"

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE"

export async function getUserLocale() {
  const cooks = await cookies()
  return cooks.get(COOKIE_NAME)?.value || defaultLocale
}

export async function setUserLocale(locale: Locale) {
  const cooks = await cookies()
  cooks.set(COOKIE_NAME, locale)
}
