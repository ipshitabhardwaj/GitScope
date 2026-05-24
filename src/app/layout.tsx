import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import AppMotionProvider from "@/components/motion/app-motion-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GitScope — Understand Any GitHub Repository",
    template: "GitScope — %s",
  },
  description:
    "Paste any GitHub URL and instantly get an interactive dependency graph, architecture diagram, contributor network, and commit history.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "GitScope — Understand Any GitHub Repository",
    description:
      "Paste any GitHub URL and instantly get an interactive dependency graph, architecture diagram, contributor network, and commit history.",
    siteName: "GitScope",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitScope — Understand Any GitHub Repository",
    description:
      "Paste any GitHub URL and instantly get an interactive dependency graph, architecture diagram, contributor network, and commit history.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased h-screen bg-background relative overflow-hidden`}
      >
        <TooltipProvider delayDuration={300}>
          <AppMotionProvider>
            <div className="app-background" />
            <div className="app-orb orb-1" />
            <div className="app-orb orb-2" />
            <div className="app-orb orb-3" />
            <div className="stars-bg" />
            <div className="app-noise" />
            {children}
          </AppMotionProvider>
        </TooltipProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(8, 18, 13, 0.9)",
              border: "1px solid rgba(0, 229, 160, 0.2)",
              color: "#f1f5f9",
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}