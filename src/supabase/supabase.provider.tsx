"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  Session,
  SupabaseClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "./utils/client";
import APP_ROUTES from "@routes/app.routes";
import { UserData } from "./model/user/UserData";

type MaybeSession = Session | UserData | null;

type Context = {
  supabase: SupabaseClient<any, string>;
  session: MaybeSession;
};

export const SupabaseContext = createContext<Context | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
  // session: MaybeSession
}) {
  const supabaseClient = createClient();
  const supabase = createClientComponentClient<any>();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);

  const [changeView, setView] = useState("");
  const path: any = usePathname();

  supabase.auth.onAuthStateChange(async (_event, sessionNew) => {
    await setSession(sessionNew);
  });

  useEffect(() => {
    const run = async () => {
      const sessionNew: any = await supabaseClient.auth.getUser();
      await setSession(sessionNew);
    };

    run();
  }, [changeView]);

  if (path != changeView) {
    setView(path);
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, _session) => {
      if (_session?.access_token !== session?.access_token) {
        try {
          router.refresh();
        } catch (ex: any) {}
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, session]);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      <>{children}</>
    </SupabaseContext.Provider>
  );
}

// authGuard.js
export const AuthGuard = ({ children }) => {
  const router = useRouter();
  const supabase = useSupabase();
  const session = supabase?.auth.getSession();
  const [loading, setLoading] = useState<boolean>(true);

  const path: any = usePathname();

  const validateProfile = async () => {
    const user = await supabase.auth.getSession();

    if (path != APP_ROUTES.USER.PROFILE_CONFIGURE) {
      if (user?.data?.session?.user?.user_metadata?.completed != true) {
        router.replace(APP_ROUTES.USER.PROFILE_CONFIGURE);
      }

      // if (isNull(user?.data?.session?.user?.user_metadata?.tenant?.id)) {
      //   router.refresh();
      //   router.replace(APP_ROUTES.USER.PROFILE_SELECT_COMPANY);
      // }
    }

    setLoading(false);
  };

  const validateSession = async () => {
    const sessionValue = (await session)?.data?.session;
    // console.log("session", sessionValue);
    // Se não houver uma sessão de usuário, redirecione para a página de login
    if (!sessionValue) {
      router.replace("/login");
    } else {
      validateProfile();
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  return children;
};

export function SupabaseAuthGuard({ children }: { children: React.ReactNode }) {
  const { session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("session", session);

    if (session == null) {
      console.log("asasdasdadadasdad");
      router.push("/login");
    }
  }, [session]);

  return (session == null && <>Ta indo</>) || <>{children}</>;
}

export const useSupabase = <
  Database = any,
  SchemaName extends string & keyof Database = "public" extends keyof Database
    ? "public"
    : string & keyof Database
>() => {
  let context = useContext(SupabaseContext);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context.supabase as SupabaseClient<Database, SchemaName>;
};

export const useSession = () => {
  let context = useContext(SupabaseContext);

  if (context === undefined) {
    throw new Error("useSession must be used inside SupabaseProvider");
  }

  return { session: context.session };
};
