"use client";
import type { Metadata } from "next";
import { login } from "../actions";
import { useEffect } from "react";
import { useSession } from "@supabaseutils/supabase.provider";
import { redirect } from "next/navigation";
import APP_ROUTES from "@routes/app.routes";
import Login from "@sections/auth/Login";

const metadata: Metadata = {
  title: `Login - ${process.env.APP_META_TITLE}`,
  description: "Faça login para ter acesso a recursos incriveis.",
  // authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  // keywords: ["e-commerce", "e-commerce template", "next.js", "react", "bonik"],
};

export default function LoginView() {
  const { session } = useSession();

  useEffect(() => {
    if (session != null) redirect(APP_ROUTES.DASHBOARD.HOME);
  }, [session]);

  return <Login formAction={login} />;
}

// import { login, signup } from './actions'

// export default function LoginPage() {
//   return (
//     <form>
//       <label htmlFor="email">Email:</label>
//       <input id="email" name="email" type="email" required />
//       <label htmlFor="password">Password:</label>
//       <input id="password" name="password" type="password" required />
//       <button formAction={login}>Log in</button>
//       <button formAction={signup}>Sign up</button>
//     </form>
//   )
// }
