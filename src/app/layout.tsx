import type { Metadata } from "next";
import "./globals.css";
import "./css/styles.css";
import "./css/logo.css";
import "./css/button.css";
import "./css/card.css";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import { ViewTransitions } from "next-view-transitions";
import NextTopLoader from "nextjs-toploader";

import { Toaster } from "@/lib/components/ui/toaster";
import { LoadingProvider } from "@/lib/contexts/LoadingContext";
import { NextThemesProvider } from "@/lib/contexts/NextThemeProvider";
import { SessionProvider } from "@/lib/contexts/SessionContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = await cookies();
  const userSession = cookie.get(`${process.env.SESSION}`)?.value;

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SessionProvider userSession={userSession}>
            <NextThemesProvider>
              <NextTopLoader
                color="rgb(var(--primary-foreground))"
                showSpinner={false}
              />
              <LoadingProvider>
                {children} <Toaster />
              </LoadingProvider>
            </NextThemesProvider>
          </SessionProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
