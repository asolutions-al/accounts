"use server"
import "server-only"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

const signInWithGoogle = async ({
  redirectUrl,
}: {
  redirectUrl: string | null
}) => {
  const supabase = await createClient()
  //   const origin =
  //     process.env.NODE_ENV === "development"
  //       ? "http://localhost:3000"
  //       : `https://${process.env.VERCEL_URL || "yourdomain.com"}`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3001/auth/callback",
    },
  })

  console.log("Google sign in data:", data)

  if (error) {
    console.error("Google sign in error:", error)
    return { error: error.message }
  }

  if (data.url) redirect(data.url)
}

export { signInWithGoogle }
