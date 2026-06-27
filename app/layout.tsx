import type { Metadata } from "next";
import localFont from "next/font/local";
import { Noto_Sans_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import {GetConfig} from "@/components/EnvConfig";

const firaCodeSym = localFont({
  src: [
    { path: "./FiraCodeSym-VF.woff2", weight: "300 700" },
    { path: "./FiraCodeSym-VF.woff", weight: "300 700" },
  ],
  variable: "--font-fira-code-sym",
  display: "swap",
});

const notoSansMono = Noto_Sans_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-noto-mono",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Pi Coding Agent Web UI",
  description: "Web UI for the Pi Coding Agent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSansMono.variable} ${firaCodeSym.variable}`} suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("pi-theme");if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})();`,
          }}
        />
      </head>
      <body style={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
        {children}
        <GetConfig />
      </body>
    </html>
  );
}
