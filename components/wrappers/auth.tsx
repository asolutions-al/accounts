import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const AuthWrapper = async ({
  children,
  condition,
}: {
  children: React.ReactNode;
  condition: "authenticated" | "unauthenticated";
}) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (condition === "authenticated" && !user) return redirect("/login");
  if (condition === "unauthenticated" && user) return redirect("/");

  return <>{children}</>;
};
