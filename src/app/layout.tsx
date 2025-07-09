import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buvette Comité des Fêtes",
  description: "Application de gestion de buvette pour comité des fêtes",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Buvette",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon-192x192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e40af",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Buvette" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="font-sans antialiased bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
