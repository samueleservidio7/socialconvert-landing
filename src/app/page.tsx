"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  Smartphone,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  Star,
  Users,
  Clock,
  ChevronDown,
  ChevronUp,
  Send,
  Check,
  BarChart3,
  Layers,
  Flame,
  Award,
} from "lucide-react";

export default function Home() {
  // --- STATO CALCOLATORE PREVENTIVO INTERATTIVO ---
  const [selectedPlan, setSelectedPlan] = useState<"bio" | "landing" | "funnel">("landing");
  const [needCopywriting, setNeedCopywriting] = useState<boolean>(true);
  const [needWhatsAppIntegration, setNeedWhatsAppIntegration] = useState<boolean>(true);
  const [urgentDelivery, setUrgentDelivery] = useState<boolean>(false);

  // Calcolo prezzo dinamico
  const basePrices = {
    bio: 290,
    landing: 590,
    funnel: 990,
  };

  const deliveryTimes = {
    bio: urgentDelivery ? "48 Ore" : "4-5 Giorni",
    landing: urgentDelivery ? "3 Giorni" : "7 Giorni",
    funnel: urgentDelivery ? "5 Giorni" : "12-14 Giorni",
  };

  const calculateTotal = () => {
    let total = basePrices[selectedPlan];
    if (needCopywriting) total += 150;
    if (needWhatsAppIntegration) total += 80;
    if (urgentDelivery) total += 180;
    return total;
  };

  // --- STATO FAQ INTERATTIVE ---
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // --- STATO FORM CONTATTO ---
  const [formData, setFormData] = useState({
    name: "",
    socialHandle: "",
    email: "",
    niche: "Consulenza / Coaching",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // Simulazione invio completato
    }, 1000);
  };

  const faqs = [
    {
      q: "Perché un cliente che mi scopre sui social dovrebbe visitare il mio sito invece di scrivermi nei DM?",
      a: "I messaggi privati su Instagram e TikTok disperdono le vendite: devi rispondere manualmente, spiegare ogni volta i prezzi e perdere ore con persone non in target. Una Landing Page professionale presenta la tua offerta in modo impeccabile, risponde a tutti i dubbi, mostra le recensioni e porta il cliente a comprare o a prenotare in autonomia.",
    },
    {
      q: "Quanto tempo serve per avere la pagina online e pronta a ricevere traffico?",
      a: "In media consegniamo il progetto chiavi in mano entro 5-7 giorni lavorativi. Con l'opzione prioritaria 'Consegna Rapida' possiamo lanciare in sole 48-72 ore.",
    },
    {
      q: "Il sito è davvero ottimizzato per chi visita da smartphone?",
      a: "Assolutamente sì: oltre il 92% del traffico che arriva da Instagram, TikTok e Facebook è da cellulare. Progettiamo con approccio 'Mobile-First', garantendo tempi di caricamento istantanei (sotto 1 secondo) e bottoni facili da cliccare.",
    },
    {
      q: "Posso collegare il pulsante WhatsApp o un calendario tipo Calendly?",
      a: "Certamente! Integriamo pulsanti WhatsApp con messaggi preimpostati, calendari interattivi, moduli contatti automatici e pixel di tracciamento (Meta Pixel, Google Analytics) per monitorare chi visita.",
    },
    {
      q: "Non ho mai gestito un sito: sarò in grado di usarlo?",
      a: "Sì. Ti consegniamo una video-guida registrata apposta per te dove ti mostriamo passo dopo passo come aggiornare testi, immagini e offerte in pochi click senza toccare una riga di codice.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* SFONDO DINAMICO CON GRADIENTI */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 blur-[130px] rounded-full" />
        <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] bg-purple-600/15 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full" />
      </div>

      {/* HEADER / BARRA DI NAVIGAZIONE */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/75 border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Social<span className="text-indigo-400">Convert</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
                Studio Web
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#problema" className="hover:text-indigo-400 transition-colors">
              Perché serve
            </a>
            <a href="#servizi" className="hover:text-indigo-400 transition-colors">
              I Servizi
            </a>
            <a href="#calcolatore" className="hover:text-indigo-400 transition-colors">
              Calcola Preventivo
            </a>
            <a href="#recensioni" className="hover:text-indigo-400 transition-colors">
              Risultati
            </a>
            <a href="#faq" className="hover:text-indigo-400 transition-colors">
              Domande Frequenti
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#calcolatore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Richiedi Progetto</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md shadow-inner">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Siti Web e Landing Page ad altissima conversione per i tuoi Social</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
            Trasforma i tuoi follower in{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent underline decoration-indigo-500/40 decoration-wavy decoration-2">
              Clienti Paganti
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Se ottieni visite da <strong>Instagram, TikTok, LinkedIn o annunci sponsorizzati</strong>, 
            mandare le persone su un sito lento o su una bio dispersiva ti fa perdere l&apos;80% delle vendite.
            Costruiamo pagine vetrina ultra-rapide e persuasive, progettate per farti vendere di più fin dal primo click.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#calcolatore"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all"
            >
              <Zap className="w-5 h-5 text-yellow-300" />
              <span>Configura il tuo Sito & Prezzo</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#servizi"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all"
            >
              <span>Scopri come funziona</span>
            </a>
          </div>

          {/* SOCIAL PROOF & METRICHE ISTANTANEE */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-3xl font-extrabold text-indigo-400">+185%</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Contatti & Conversioni medie
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-3xl font-extrabold text-emerald-400">&lt; 0.8s</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Velocità di apertura da mobile
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-3xl font-extrabold text-purple-400">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Ottimizzato per Smartphone
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-3xl font-extrabold text-pink-400">5 Giorni</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Tempi medi di consegna
              </div>
            </div>
          </div>
        </section>

        {/* SEZIONE: IL PROBLEMA VS LA SOLUZIONE */}
        <section id="problema" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-400">
              Analisi Strategica
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
              Perché i vecchi metodi ti stanno facendo perdere vendite ogni giorno
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Box Negativo */}
            <div className="p-8 rounded-2xl bg-rose-950/20 border border-rose-900/50 backdrop-blur-sm relative overflow-hidden">
              <div className="flex items-center gap-3 text-rose-400 font-bold text-lg mb-6">
                <div className="w-8 h-8 rounded-full bg-rose-900/50 flex items-center justify-center">
                  ✕
                </div>
                <span>Cosa succede con un sito comune o un link generico:</span>
              </div>
              <ul className="space-y-4 text-slate-300 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold mt-0.5">•</span>
                  <span><strong>Dispersione totale:</strong> Un elenco disordinato di 10 link diversi dove il cliente non sa dove cliccare e chiude la pagina.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold mt-0.5">•</span>
                  <span><strong>Caricamento lumaca:</strong> Se il sito impiega più di 2 secondi ad aprirsi su 4G/5G, il 53% degli utenti torna su Instagram.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold mt-0.5">•</span>
                  <span><strong>Zero fiducia:</strong> Pagine anonime senza recensioni in vista e senza un messaggio chiaro che spieghi subito il vantaggio per chi acquista.</span>
                </li>
              </ul>
            </div>

            {/* Box Positivo */}
            <div className="p-8 rounded-2xl bg-indigo-950/30 border border-indigo-800/60 backdrop-blur-sm relative overflow-hidden shadow-xl shadow-indigo-950/50">
              <div className="flex items-center gap-3 text-indigo-300 font-bold text-lg mb-6">
                <div className="w-8 h-8 rounded-full bg-indigo-600/40 flex items-center justify-center">
                  <Check className="w-5 h-5 text-indigo-300" />
                </div>
                <span>Cosa ottieni con le nostre Landing Page Vetrina:</span>
              </div>
              <ul className="space-y-4 text-slate-200 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Un solo obiettivo chiaro:</strong> Guidare il visitatore a prenotare una consulenza, scriverti su WhatsApp o acquistare subito.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Velocità estrema:</strong> Codice moderno su server globali ultra-veloci (gli stessi di Vercel), per aprirsi all&apos;istante.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Autorità e Social Proof:</strong> Recensioni in evidenza, numeri reali e design degno dei brand più famosi.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SEZIONE SERVIZI */}
        <section id="servizi" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-400">
              Soluzioni Chiavi in Mano
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
              Cosa possiamo creare per te o per i tuoi clienti
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Servizio 1 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                1. Bio-Page Interattiva
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Sostituisci il banale Linktree con una mini-applicazione su misura: grafica personalizzata con i colori del brand, video di benvenuto, offerte in risalto e link diretti.
              </p>
              <div className="border-t border-slate-800/80 pt-4 text-xs text-indigo-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Ideale per Creator & Micro-Brand
              </div>
            </div>

            {/* Servizio 2 */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-slate-900/80 border-2 border-indigo-500/60 relative transition-all hover:-translate-y-1 shadow-xl shadow-indigo-950/50 group">
              <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r from-indigo-500 to-pink-500 text-white uppercase tracking-wider">
                Più Richiesto
              </div>
              <div className="w-14 h-14 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                2. Landing Page Vetrina / Lead Gen
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Una pagina vetrina completa studiata per liberi professionisti, consulenti, personal trainer, studi e agenzie. Presenta i servizi, testimonianze e modulo di prenotazione diretta.
              </p>
              <div className="border-t border-slate-800/80 pt-4 text-xs text-purple-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Perfetta per Professionisti & Attività
              </div>
            </div>

            {/* Servizio 3 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                3. Pagina Vendita Prodotto / Funnel
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Studiata per vendere un prodotto digitale (videocorso, ebook, guida), un servizio continuativo o un abbonamento con copywriting persuasivo e checkout integrato.
              </p>
              <div className="border-t border-slate-800/80 pt-4 text-xs text-pink-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Ideale per Infoprodotti & Corsi
              </div>
            </div>
          </div>
        </section>

        {/* SEZIONE: CALCOLATORE PREVENTIVO INTERATTIVO */}
        <section id="calcolatore" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/50 text-indigo-300 border border-indigo-700/50">
              <BarChart3 className="w-3.5 h-3.5" /> Simulatore Interattivo
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
              Calcola il preventivo e i tempi in tempo reale
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base">
              Personalizza le caratteristiche della pagina e vedi istantaneamente il costo stimato e i giorni di lavorazione.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            {/* Scelta Tipo di Pagina */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                1. Scegli il tipo di struttura web:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPlan("bio")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedPlan === "bio"
                      ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold text-base text-white">Bio-Page Interattiva</div>
                  <div className="text-xs text-slate-400 mt-1">Per link in bio avanzato</div>
                  <div className="text-sm font-extrabold text-indigo-400 mt-3">290 €</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlan("landing")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedPlan === "landing"
                      ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold text-base text-white flex items-center justify-between">
                    <span>Landing Vetrina</span>
                    <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-bold">TOP</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Per servizi e consulenze</div>
                  <div className="text-sm font-extrabold text-indigo-400 mt-3">590 €</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlan("funnel")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedPlan === "funnel"
                      ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold text-base text-white">Funnel & Vendita</div>
                  <div className="text-xs text-slate-400 mt-1">Per corsi e prodotti</div>
                  <div className="text-sm font-extrabold text-indigo-400 mt-3">990 €</div>
                </button>
              </div>
            </div>

            {/* Opzioni Aggiuntive */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                2. Servizi opzionali aggiuntivi:
              </label>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={needCopywriting}
                      onChange={(e) => setNeedCopywriting(e.target.checked)}
                      className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Scrittura Testi Strategici (Copywriting Persuasivo)
                      </div>
                      <div className="text-xs text-slate-400">
                        Scriviamo noi i titoli e i testi per convincere il visitatore a comprare
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-slate-300">+150 €</div>
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={needWhatsAppIntegration}
                      onChange={(e) => setNeedWhatsAppIntegration(e.target.checked)}
                      className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Integrazione WhatsApp & Calendario Automatico
                      </div>
                      <div className="text-xs text-slate-400">
                        Pulsante rapido con messaggio pronto e modulo appuntamenti Calendly
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-slate-300">+80 €</div>
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={urgentDelivery}
                      onChange={(e) => setUrgentDelivery(e.target.checked)}
                      className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Consegna Rapida Prioritaria
                      </div>
                      <div className="text-xs text-slate-400">
                        Lancio prioritario in tempi dimezzati
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-slate-300">+180 €</div>
                </label>
              </div>
            </div>

            {/* Risultato Totale e Riepilogo */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-indigo-700/60 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-indigo-300">
                  Preventivo Stimato
                </div>
                <div className="text-4xl font-extrabold text-white mt-1">
                  {calculateTotal()} €
                  <span className="text-xs font-normal text-slate-400 ml-2">una tantum</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 mt-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Tempi di consegna stimati: <strong>{deliveryTimes[selectedPlan]}</strong></span>
                </div>
              </div>

              <a
                href="#contatti"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-white text-slate-950 hover:bg-slate-100 shadow-lg shadow-white/10 transition-all hover:scale-105"
              >
                <span>Conferma e Richiedi</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* SEZIONE RECENSIONI E RISULTATI */}
        <section id="recensioni" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-400">
              Casi Studio Reali
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
              Cosa dicono i creator e i professionisti che lo usano
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                &ldquo;Prima le persone arrivavano dai miei reel di fitness su Instagram ma nessuno comprava le mie schede di allenamento. Con la nuova landing page ho registrato 26 nuovi clienti nel primo mese.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-sm">
                  MT
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Marco T.</div>
                  <div className="text-xs text-slate-400">Personal Trainer (34k follower IG)</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                &ldquo;Il tasto per scrivermi direttamente su WhatsApp con il messaggio già compilato è una genialata. Chi visita dal link in bio non ha più scuse e ricevo lead caldi ogni giorno.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center font-bold text-white text-sm">
                  EB
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Elena B.</div>
                  <div className="text-xs text-slate-400">Consulente Fiscale & Finanziaria</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                &ldquo;La velocità di caricamento fa tutta la differenza del mondo. Il vecchio sito impiegava 4 secondi, questo si apre all&apos;istante appena clicchi dal profilo TikTok.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center font-bold text-white text-sm">
                  LR
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Luca R.</div>
                  <div className="text-xs text-slate-400">Founder Brand E-commerce</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION INTERATTIVO */}
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-800/60">
          <div className="text-center mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-400">
              Dubbi Comuni
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
              Domande Frequenti
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-white hover:text-indigo-300 transition-colors"
                  >
                    <span className="text-base sm:text-lg">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-indigo-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-800/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* MODULO DI CONTATTO / PRENOTAZIONE PROGETTO */}
        <section id="contatti" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-800/60">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-3xl font-extrabold text-white">
                Pronto a lanciare la tua Landing Page?
              </h2>
              <p className="mt-2 text-slate-400 text-sm">
                Compila i dettagli qui sotto: riceverai un&apos;analisi gratuita del tuo profilo social e la bozza della struttura ideale entro 24 ore.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-center animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Richiesta Ricevuta con Successo!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Grazie {formData.name || "amico"}! Analizzeremo il tuo profilo <strong>{formData.socialHandle || "@tuo_profilo"}</strong> e ti risponderemo all&apos;indirizzo <strong>{formData.email}</strong> entro poche ore.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-all"
                >
                  Invia un&apos;altra richiesta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                      Il tuo Nome o Nome Brand *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="es. Marco Rossi"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                      Profilo Social (Instagram / TikTok) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.socialHandle}
                      onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
                      placeholder="es. @marcorossi_fit"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                      Email di contatto *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="es. marco@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                      Settore / Tipologia di Attività
                    </label>
                    <select
                      value={formData.niche}
                      onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                      <option>Consulenza / Coaching</option>
                      <option>Fitness / Benessere</option>
                      <option>E-commerce / Prodotti Fisici</option>
                      <option>Infoprodotti / Corsi Online</option>
                      <option>Studio Professionale / Agenzia</option>
                      <option>Altro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                    Cosa vendi o quale obiettivo vuoi raggiungere? (Opzionale)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Raccontaci brevemente qual è il tuo servizio principale e cosa vorresti che facessero i visitatori sul sito..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-base bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Invia Richiesta e Ricevi Analisi Gratuita</span>
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-300">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>SocialConvert Studio</span>
          </div>
          <p>© 2026 SocialConvert Studio. Tutti i diritti riservati.</p>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#problema" className="hover:text-slate-200">Strategia</a>
            <a href="#servizi" className="hover:text-slate-200">Servizi</a>
            <a href="#calcolatore" className="hover:text-slate-200">Preventivo</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
