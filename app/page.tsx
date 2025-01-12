import { SignOutBtn } from '@/components/button'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

async function Page() {
  const signOut = async () => {
    'use server'

    const supabase = await createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }
  return (
    <div>
      hello
      <SignOutBtn performAction={signOut} />
    </div>
  )
}

export default Page
