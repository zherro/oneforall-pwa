"use client";
import { useRouter, useSearchParams } from "next/navigation";
import StoryLoadBoard from "../StoryLoadBoard";
import { useSession } from "@supabaseutils/supabase.provider";

const LoadingView = () => {
  const { revalidate } = useSession();
  const router = useRouter();
  const query = useSearchParams();

  setTimeout(() => {
    revalidate();
    router.push(query.get("ref") || "/minhaconta");
  }, 3000);

  return <StoryLoadBoard />;
};

export default LoadingView;
