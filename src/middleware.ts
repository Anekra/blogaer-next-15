import { NextRequest, NextResponse } from "next/server";

import { authorization } from "@/lib/middlewares/authorization";
import { requestForm } from "@/lib/middlewares/requestForm";
import { requestFormRoutes } from "@/lib/utils/constants";

export default async function middleware(request: NextRequest) {
  let currentRequest = request;
  const path = request.nextUrl.pathname;
  const authRes = await authorization(request, path);
  if (authRes) {
    if (authRes.headers.get("Location")) return authRes;

    const injectedClientId = authRes.headers.get("x-auth-client-id");
    if (injectedClientId) {
      const modifiedHeaders = new Headers(request.headers);
      modifiedHeaders.set("x-auth-client-id", injectedClientId);
      currentRequest = new NextRequest(request.url, {
        headers: modifiedHeaders,
        method: request.method,
        body: request.body
      });
    } else {
      currentRequest = request;
    }
  }

  if (requestFormRoutes.some((route) => path.startsWith(route))) {
    const formRes = await requestForm(currentRequest);
    if (formRes) return formRes;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};
