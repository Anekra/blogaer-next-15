import { NextRequest, NextResponse } from "next/server";

import { authorization } from "./lib/middlewares/authorization";
import { requestForm } from "./lib/middlewares/requestForm";
import { requestFormRoutes } from "./lib/utils/constants";

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authRes = await authorization(request, path);
  if (authRes) return authRes;

  if (requestFormRoutes.some((route) => path.startsWith(route))) {
    const formRes = await requestForm(request);
    if (formRes) return formRes;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};
