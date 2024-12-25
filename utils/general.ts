import { Session } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const setSbCookie = (session: Session) => {
  console.log("session", session);
  if (process.env.NODE_ENV === "production") {
    console.log("Setting sb-auth cookie");
    const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
    cookies().set("sb-auth", JSON.stringify(session), {
      // cookie options
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      domain: ".asolutions.al",
      maxAge,
      // expires: new Date(session?.expires_at?.toString() || 0),
    });
    console.log("Cookie set");
  }
};
