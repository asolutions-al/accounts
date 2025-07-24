import { SignupForm } from "@/components/form"
import { createClient } from "@/utils/supabase/server"

const Page = () => {
  return (
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
  )
}

export default Page
