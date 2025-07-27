import { DOMAIN } from "@/constants/env"
import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

const isDev = process.env.NODE_ENV === "development"

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, {
              domain: DOMAIN, // https://github.com/supabase/supabase/issues/473#issuecomment-2543434925
              ...options,
            })
          )
        },
      },
    }
  )

  // This will refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const userRes = await supabase.auth.getUser()

  const isAtAuthRoute = ["/login", "/signup", "/confirm-email"].some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (
    !isAtAuthRoute && // protected route
    !userRes.data.user
  ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAtAuthRoute && userRes.data.user)
    return NextResponse.redirect(new URL("/", request.url))

  return response
}
