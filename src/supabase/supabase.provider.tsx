"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
import DB_KEYS from "@utils/db/keys";
import storageUtil from "@utils/db/LocalStorageUtil";
import { useAppContext } from "@context/app-context";

type MaybeSession = Session | UserData | null;

type Context = {
  supabase: SupabaseClient<any, string>;
  session: MaybeSession;
  revalidate: any;
  auth: {
    isAuthenticated: boolean;
    loaded: boolean;
  };
};

export const SupabaseContext = createContext<Context | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
  // session: MaybeSession
}) {
  const { dispatch } = useAppContext();
  const supabaseClient = createClient();
  const supabase = createClientComponentClient<any>();
  const router = useRouter();
  const path: any = usePathname();
  const [session, setSession] = useState<any>(null);
  const [lastPath, setLastPath] = useState<any>(null);
  const [refreshdsAt, refreshd] = useState<Date | null>(null);
  const [auth, setAuth] = useState<{
    isAuthenticated: boolean;
    loaded: boolean;
  }>({
    isAuthenticated: false,
    loaded: false,
  });

  // POR AlGUM MOTIVO FICA SETANDO A O SESSION PRA null - nunca mecha
  // supabase.auth.onAuthStateChange(async (_event, sessionNew) => {
  //   await setSession(sessionNew);
  // });

  const fetchSession = useCallback(async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    await setSession(user);
    setAuth({
      isAuthenticated: new SessionUtils(user).isAuthenticated(),
      loaded: true,
    });
  }, []);

  const revalidate = fetchSession;

  useEffect(() => {
    LOG.debug("Provider->fetchSession");
    refreshd(new Date());
    fetchSession();
  }, []);

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      setSession(null);
    }
  });

  // useEffect(() => {
  //   if (path != lastPath) {
  //     fetchSession();
  //     const {
  //       data: { subscription },
  //     } = supabase.auth.onAuthStateChange((_, _session) => {
  //       if (_session?.access_token !== session?.access_token) {
  //         // CUIDADO - refresh infinito
  //         router.refresh();
  //       }
  //     });

  //     setLastPath(path);
  //     return () => {
  //       if (subscription) {
  //         subscription.unsubscribe();
  //       }
  //     };
  //   }
  // }, [path, createClient]);

  useEffect(() => {
    const sessionUtils = new SessionUtils(session);
    setLastPath(path);

    if (sessionUtils.isAuthenticated()) {
      dispatch({
        type: "SESSION",
        payload: sessionUtils,
      });
    } else {
      dispatch({
        type: "SESSION",
        payload: undefined,
      });
    }

    validateAutorizedsPaths(
      sessionUtils.signature(),
      sessionUtils.isAuthenticated(),
      sessionUtils.isCompleted(),
      path,
      router,
      sessionUtils.getTenant(),
      sessionUtils.getUser()
    );
  }, [path, session, refreshdsAt]);

  return (
    <SupabaseContext.Provider
      value={{
        supabase,
        session,
        revalidate,
        auth,
      }}
    >
      <>{children}</>
    </SupabaseContext.Provider>
  );
}

// authGuard.js
export const AuthGuard = ({ skelecton, children }) => {
  const router = useRouter();
  let context = useContext(SupabaseContext);

  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    if (context?.auth.loaded) {
      if (context?.auth.isAuthenticated) {
        setTimeout(() => {
          setAuth(true);
        }, 1000); // 2000ms = 2 segundos
      } else {
        // alert("vvv");
        router.push("/login");
      }
    }
  }, [context?.auth.isAuthenticated]);

  useEffect(() => {
    context?.revalidate();
  }, []);

  return !context?.auth.loaded && !auth ? skelecton : children;
};

function validateAutorizedsPaths(
  signature: string,
  isAuthenticated: boolean,
  isCompleted: boolean,
  path: any,
  router,
  tenant,
  user
) {
  LOG.debug("Provider::validateAutorizedsPaths for path: " + path);
  const paths = (
    process.env.APP_AUTH_IF_AUTHENTICATED_DONT_USE_ROUTES || ""
  ).split(",");

  if (isCompleted) {
    storageUtil(user.id).set(DB_KEYS.LAST_COMPLETE_ATTEMPT, new Date());
  }

  let requireProfile = ObjectUtils.isNull(
    storageUtil(user.id).get(DB_KEYS.LAST_COMPLETE_ATTEMPT)
  );

  if (isAuthenticated && path != APP_ROUTES.DASHBOARD.WELCOME) {
    if (path == "/complete-your-profile" && isCompleted && !requireProfile) {
      router.push("/profile-completed");
    } else if (!isCompleted && requireProfile) {
      router.push("/complete-your-profile");
    } else if (paths.includes(path)) {
      router.push(process.env.APP_AUTH_IF_AUTHENTICATED_REDIRECT_TO || "/");
    }
  }
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
    revalidate: context.revalidate,
    signature: session?.signature(),
    session: session?.getUser(),
    tenant: session?.getTenant(),
    isAuthenticated: session == undefined ? false : session?.isAuthenticated(),
    isConfirmed: session?.isConfirmed(),
    isCompleted: session?.isCompleted(),
  };
};

export const useSupabaseContext = () => useContext(SupabaseContext);
