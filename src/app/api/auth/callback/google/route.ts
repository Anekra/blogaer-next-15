import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const redirectUrl = searchParams.get("request_url");

  const code = searchParams.get("code");
  if (!code && state) {
    const searchParams = [
      {
        param: "scope",
        value:
          "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
      },
      { param: "client_id", value: `${process.env.AUTH_GOOGLE_CLIENT_ID}` },
      {
        param: "redirect_uri",
        value: "http://localhost:3000/api/auth/callback/google"
      },
      { param: "access_type", value: "offline" },
      { param: "response_type", value: "code" },
      { param: "state", value: state }
    ];
    const googleUrl = new URL("https://accounts.google.com/o/oauth2/auth");
    searchParams.forEach(({ param, value }) => {
      googleUrl.searchParams.set(param, value);
    });

    const googleRedirectRes = NextResponse.json(
      { status: "Redirect", url: googleUrl },
      { status: 302 }
    );
    if (redirectUrl) {
      googleRedirectRes.cookies.set("redirectUrl", `${redirectUrl}`, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 1 * 3 * 60
      });
    }

    return googleRedirectRes;
  }

  const errUrl = new URL("/login", request.nextUrl);
  const errRedirect = NextResponse.redirect(errUrl, 308);
  if (!state) {
    return errRedirect;
  }

  try {
    const states = state.split("-");
    const fingerPrint = states[states.length - 1];
    const res = await fetch(`${process.env.API_ROUTE}/auth/google`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Oauth2 ${code}-${fingerPrint}`,
        "Content-Type": "application/json",
        Origin: "http://localhost:3000"
      }
    });
    const resJson = await res.json();
    console.log("<<< google oauth route >>>", resJson);

    const redirectCookie = request.cookies.get("redirectUrl")?.value;
    if (!res.ok) {
      if (redirectCookie) errRedirect.cookies.delete("redirectUrl");
      const searchParams = [
        { param: "redirect", value: "Oauth login failed." },
        { param: "error", value: resJson.error }
      ];
      searchParams.forEach(({ param, value }) => {
        errUrl.searchParams.set(param, value);
      });

      return errRedirect;
    }

    const url = new URL(redirectCookie || "/home", request.nextUrl);
    const nextRes = NextResponse.redirect(url, 308);
    nextRes.cookies.delete("redirectUrl");
    const isSecure = process.env.NODE_ENV === "production";
    // access cookie
    nextRes.cookies.set(
      `${process.env.ACCESS_TOKEN}`,
      resJson.data.access,
      isSecure
        ? {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 1 * 10 * 60
          }
        : {
            httpOnly: true,
            maxAge: 1 * 10 * 60
          }
    );
    // refresh cookie
    nextRes.cookies.set(
      `${process.env.REFRESH_TOKEN}`,
      resJson.data.refresh,
      isSecure
        ? {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            maxAge: 24 * 60 * 60
          }
        : {
            httpOnly: true,
            maxAge: 24 * 60 * 60
          }
    );

    const sessionData = {
      username: resJson.data.username,
      name: resJson.data.name,
      email: resJson.data.email,
      role: resJson.data.role,
      img: resJson.data.img
    };
    const sessionCookieName = `${process.env.SESSION}`;
    const encryptedData = jwt.sign(sessionData, sessionCookieName, {
      expiresIn: "10m"
    });

    nextRes.cookies.set(
      sessionCookieName,
      encryptedData,
      isSecure
        ? {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            maxAge: 1 * 1 * 20
          }
        : {
            httpOnly: true,
            maxAge: 1 * 1 * 20
          }
    );

    return nextRes;
  } catch (error) {
    const searchParams = [
      { param: "redirect", value: "Oauth login failed." },
      {
        param: "error",
        value: error instanceof Error ? error.message : "Internal server error."
      }
    ];

    errUrl.pathname = "/login";
    searchParams.forEach(({ param, value }) => {
      errUrl.searchParams.set(param, value);
    });

    return errRedirect;
  }
}
