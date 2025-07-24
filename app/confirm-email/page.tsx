import { ConfirmEmailForm } from "@/components/form/confirm-email"
import { user } from "@/supabase/migrations/schema"
import { db } from "@/utils/supabase/database"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

interface PageProps {
  searchParams: {
    email?: string
  }
}

const Page = ({ searchParams }: PageProps) => {
  const email = searchParams.email

  if (!email) {
    redirect("/signup")
  }

  return (
    <ConfirmEmailForm
      email={email}
      verifyAction={async (values) => {
        "use server"
        const supabase = await createClient()

        const { data, error } = await supabase.auth.verifyOtp({
          email: values.email,
          token: values.code,
          type: "signup",
        })

        if (data.user) {
          await db.insert(user).values({
            id: data.user.id,
            email: data.user.email!,
          })
          return {
            error: null,
            success: {
              data: true,
            },
          }
        }

        if (error) {
          return {
            success: null,
            error: {
              message: error.message,
            },
          }
        }

        return {
          success: null,
          error: {
            message: "Verification failed",
          },
        }
      }}
      resendAction={async (email) => {
        "use server"
        const supabase = await createClient()

        const { error } = await supabase.auth.resend({
          type: "signup",
          email,
        })

        if (error)
          return {
            error: {
              message: error.message,
            },
            success: null,
          }

        return {
          error: null,
          success: {
            data: true,
          },
        }
      }}
    />
  )
}

export default Page
