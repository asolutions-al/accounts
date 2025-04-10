import { LoginForm } from "@/components/form"
import { createClient } from "@/utils/supabase/server"

const Page = () => {
  return (
    <LoginForm
      performAction={async (values) => {
        "use server"
        const supabase = await createClient()
        const res = await supabase.auth.signInWithPassword(values)
        return { error: res.error?.message || null }
      }}
    />
  )
}

export default Page
