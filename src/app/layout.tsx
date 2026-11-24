import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitProtocol™ | Metodo Ricomposizione Corporea per Professionisti",
  description:
    "Raggiungi la tua migliore forma fisica in 90 giorni con sole 3 sessioni da 45 minuti a settimana, senza rinunciare alla tua vita sociale. Fai il test gratuito in 60 secondi.",
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
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-black font-sans">
        {children}
      </body>
    </html>
  );
}
