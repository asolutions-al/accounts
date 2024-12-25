import { LoginForm, LoginSchemaType } from "@/components/form";
import { AuthWrapper } from "@/components/wrappers";
import { setSbCookie } from "@/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type Args = {
  searchParams: SearchParams;
};
async function LoginPage({ searchParams }: Args) {
  const signIn = async (values: LoginSchemaType) => {
    "use server";
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword(values);
    if (error) throw error;
    setSbCookie(data.session);
    const path = searchParams.redirectUrl || `/`;
    return { path };
  };

  const performGoogleSignIn = async () => {
    "use server";
    const supabase = createClient();
    const origin = headers().get("origin");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    if (data?.url) return redirect(data.url);
  };

  return (
    <LoginForm
      performAction={signIn}
      performGoogleSignIn={performGoogleSignIn}
    />
  );
}

export default (args: Args) =>
  AuthWrapper({
    children: <LoginPage {...args} />,
    condition: "unauthenticated",
    ...args,
  });
