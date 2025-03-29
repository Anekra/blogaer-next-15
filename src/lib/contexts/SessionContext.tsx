"use client";
import jwt from "jsonwebtoken";
import { useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { toast } from "sonner";
import useSWR from "swr";

import logout from "@/lib/actions/server/auth/logout";
import { Session } from "@/lib/types/common";
import { newUrl } from "@/lib/utils/helper";

const SessionContext = createContext({
  session: null as Session,
  setSession: (_: Session) => {}
});

export function SessionProvider({
  children,
  userSession
}: {
  children: ReactNode;
  userSession?: string;
}) {
  const [session, setSession] = useState<Session>(null);
  const redirectMessage = useSearchParams().get("redirect");
  const sessionName = `${process.env.NEXT_PUBLIC_SESSION}`;
  const { data } = useSWR("/api/auth/refresh", async (url) => {
    const sessionToken = localStorage.getItem(sessionName);
    if (sessionToken) {
      const decodedSession = jwt.decode(sessionToken) as Session;
      if (!decodedSession) return null;
      if (decodedSession.exp > Date.now() / 1000) return decodedSession;
      try {
        const searchParams = [{ param: "session", value: sessionToken }];
        const refreshUrl = newUrl(url, searchParams);
        const refreshRes = await fetch(refreshUrl);
        if (!refreshRes.ok) {
          if (refreshRes.status === 503) return decodedSession;

          localStorage.removeItem(sessionName);
          await logout();
          return null;
        }

        const refreshJson = await refreshRes.json();
        localStorage.setItem(sessionName, refreshJson.session);

        return decodedSession;
      } catch (error) {
        return decodedSession;
      }
    }
  });

  useEffect(() => {
    const sessionToken = localStorage.getItem(sessionName);
    if (!data || !sessionToken) setSession(null);
    else setSession(data);

    if (userSession && !sessionToken) {
      localStorage.removeItem("CSRFToken");
      localStorage.setItem(sessionName, userSession);
      const decodedSession = jwt.decode(userSession) as Session;
      toast.success("Login successful.", {
        position: "bottom-right",
        duration: 2000
      });
      setSession(decodedSession);
    }

    if (redirectMessage) {
      toast(redirectMessage, {
        position: "bottom-right",
        duration: 2000
      });
    }
  }, [sessionName, data, userSession, redirectMessage]);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
