import type { Metadata } from "next";
import { signup } from "../actions";
import Signup from "@sections/auth/Signup";

export const metadata: Metadata = {
  title: `Criar Conta - ${process.env.APP_META_TITLE}`,
  description: "Crie sua conta em instantes e tenha acesso a todos os recursos incriveis da nossa plataforma.",
  // authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  // keywords: ["e-commerce", "e-commerce template", "next.js", "react", "bonik"],
};

export default function SignUpPage() {
  return <Signup formAction={signup} />;
}
