import { LoginForm } from "@/components/form"
import { AuthLayout } from "@/components/layout/auth-layout"
import { createClient } from "@/utils/supabase/server"

const Page = () => {
  return (
    <AuthLayout>
      <LoginForm
        performAction={async (values) => {
          "use server"
          const supabase = await createClient()
          const res = await supabase.auth.signInWithPassword(values)
          return { error: res.error?.message || null }
        }}
      />
    </AuthLayout>
  )
}

export default Page
