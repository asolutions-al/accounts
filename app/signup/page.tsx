import { SignupForm } from "@/components/form"
import { AuthLayout } from "@/components/layout/auth-layout"
import { createClient } from "@/utils/supabase/server"

const Page = () => {
  return (
    <AuthLayout
      title="Join Us Today"
      subtitle="Create your account to get started"
    >
      <SignupForm
        performAction={async (values) => {
          "use server"
          const supabase = await createClient()
          const res = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
          })

          return {
            error: res.error?.message || null,
          }
        }}
      />
    </AuthLayout>
  )
}

export default Page
