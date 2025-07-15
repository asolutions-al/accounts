import { user as schUser } from "@/supabase/migrations/schema"
import { db } from "@/utils/supabase/database"
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  console.log("Auth callback route hit")
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  console.log("Received code:", code)
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/"

  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/"
  }

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Check if user exists in database, if not create them
      try {
        const existingUser = await db.query.user.findFirst({
          where: (user, { eq }) => eq(user.id, data.user.id),
        })

        if (!existingUser) {
          await db.insert(schUser).values({
            id: data.user.id,
            email: data.user.email!,
          })
        }
      } catch (dbError) {
        console.error("Database error:", dbError)
        // Continue with redirect even if database operation fails
      }

      const forwardedHost = request.headers.get("x-forwarded-host") // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development"

      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
