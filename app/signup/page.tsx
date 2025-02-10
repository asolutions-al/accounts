import { SignupForm } from "@/components/form"
import { user as schUser } from "@/supabase/migrations/schema"
import { db } from "@/utils/supabase/database"
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

        if (res.data.user) {
          await db.insert(schUser).values({
            id: res.data.user.id,
            email: values.email,
          })
        }

        return res
      }}
    />
  )
}

export default Page
