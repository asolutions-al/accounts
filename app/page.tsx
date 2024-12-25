import { SignOutBtn } from "@/components/button";
import { AuthWrapper } from "@/components/wrappers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function Page() {
  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect(`/login`);
  };
  return (
    <div>
      hello
      <SignOutBtn performAction={signOut} />
    </div>
  );
}

export default () =>
  AuthWrapper({
    children: <Page />,
    condition: "authenticated",
  });
