import { SignOutBtn } from '@/components/button'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const Page = async () => {
  const client = await createClient()
  const {
    data: { user },
  } = await client.auth.getUser()

  const signOut = async () => {
    'use server'

    const client = await createClient()
    await client.auth.signOut()
    return redirect('/login')
  }

  return (
    <div>
      <p>Hello {user?.email}</p>
      <SignOutBtn performAction={signOut} />
    </div>
  )
}

export default Page
