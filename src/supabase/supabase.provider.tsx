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
import SessionUtils from "./session";
import ObjectUtils from "@utils/helpers/Object.utils";
import { LOG } from "@utils/log";

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
  const path: any = usePathname();
  const [session, setSession] = useState<any>(null);
  const [lastPath, setLastPath] = useState<any>(null);

  // POR AlGUM MOTIVO FICA SETANDO A O SESSION PRA null - nunca mecha
  // supabase.auth.onAuthStateChange(async (_event, sessionNew) => {
  //   await setSession(sessionNew);
  // });

  const fetchSession = async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    setSession(user);
  };

  useEffect(() => {
    LOG.debug("Provider->fetchSession");
    fetchSession();
  }, []);

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      setSession(null);
    }
  });

  useEffect(() => {
    if (path != lastPath) {
      fetchSession();
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_, _session) => {
        if (_session?.access_token !== session?.access_token) {
          // CUIDADO - refresh infinito
          router.refresh();
        }
      });

      setLastPath(path);
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }
  }, [path, createClient]);

  useEffect(() => {
    const sessionUtils = new SessionUtils(session);
    validateAutorizedsPaths(
      sessionUtils.signature(),
      sessionUtils.isAuthenticated(),
      sessionUtils.isCompleted(),
      path,
      router
    );
  }, [path, session]);

  return (
    <SupabaseContext.Provider value={{ supabase, session }}>
      <>{children}</>
    </SupabaseContext.Provider>
  );
}

// authGuard.js
export const AuthGuard = ({ skelecton, children }) => {
  const router = useRouter();
  const supabase = useSupabase();
  const { isAuthenticated } = useSession();

  const [loading, setLoading] = useState<boolean>(true);
  const [auth, setAuth] = useState<boolean>(false);

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

  useEffect(() => {
    const supabaseClient = createClient();

    const validate = async () => {
      LOG.debug("Validate session");
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();

      const sUser = new SessionUtils(user);

      if (sUser.isAuthenticated() == true) {
        setLoading(false);
        setAuth(true);
      } else {
        router.push("/login");
      }
    };

    validate();
  }, []);

  return loading && !auth ? skelecton : children;
};

function validateAutorizedsPaths(
  signature: string,
  isAuthenticated: boolean,
  isCompleted: boolean,
  path: any,
  router
) {
  LOG.debug("Provider::validateAutorizedsPaths for path: " + path);
  const paths = (
    process.env.APP_AUTH_IF_AUTHENTICATED_DONT_USE_ROUTES || ""
  ).split(",");

  if (isAuthenticated) {
    if (path == "/complete-your-profile" && isCompleted) {
      router.push("/profile-completed");
    } else if (!isCompleted) {
      router.push("/complete-your-profile");
    } else if (paths.includes(path)) {
      router.push(process.env.APP_AUTH_IF_AUTHENTICATED_REDIRECT_TO || "/");
    }
  }
}

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
  const path = usePathname();
  let context = useContext(SupabaseContext);

  const [session, setSession] = useState<SessionUtils>();

  useEffect(() => {
    if (context != undefined && ObjectUtils.nonNull(context?.session)) {
      setSession(new SessionUtils(context.session));
    } else {
      setSession(undefined);
    }
  }, [context?.session]);

  if (context === undefined) {
    throw new Error("useSession must be used inside SupabaseProvider");
  }

  return {
    signature: session?.signature(),
    session: session?.getUser(),
    tenant: session?.getTenant(),
    isAuthenticated: session == undefined ? false : session?.isAuthenticated(),
    isConfirmed: session?.isConfirmed(),
    isCompleted: session?.isCompleted(),
  };
};
