"use server"
import "server-only"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

const signInWithDemo = async ({
  redirectUrl,
}: {
  redirectUrl: string | null
}) => {
  const supabase = await createClient()
  const res = await supabase.auth.signInWithPassword({
    email: "demo@asolutions.al",
    password: "12345678",
  })

  if (res.error) {
    return { error: res.error.message }
  }

  redirect(redirectUrl || "/")
}

export { signInWithDemo }
