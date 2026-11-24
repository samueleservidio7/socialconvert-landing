import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SocialConvert Studio | Siti Web & Landing Page ad Alta Conversione",
  description:
    "Trasforma i follower di Instagram, TikTok e LinkedIn in clienti paganti con landing page veloci, moderne e ottimizzate per smartphone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className="h-full antialiased scroll-smooth"
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
