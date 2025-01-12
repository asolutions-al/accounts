import { LoginForm, LoginSchemaType } from '@/components/form'
import { createClient } from '@/utils/supabase/server'

async function LoginPage() {
  const signIn = async (values: LoginSchemaType) => {
    'use server'
    const supabase = await createClient()
    const res = await supabase.auth.signInWithPassword(values)
    return res
  }

  return <LoginForm performAction={signIn} />
}

export default LoginPage
