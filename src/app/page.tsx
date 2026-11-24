"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Zap,
  TrendingUp,
  ShieldCheck,
  MessageCircle,
  Star,
  Clock,
  ChevronDown,
  ChevronUp,
  Send,
  Calendar,
  Check,
  Award,
  Sparkles,
  Flame,
  Activity,
  Heart,
  Scale,
} from "lucide-react";

export default function Home() {
  // --- STATO DEL QUIZ DI CONVERSIONE (STEP FUNNEL) ---
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [calcProgress, setCalcProgress] = useState<number>(15);

  const [quizAnswers, setQuizAnswers] = useState({
    gender: "Uomo",
    goal: "Ricomposizione Corporea (bruciare grasso e definire)",
    frequency: "3 volte da 45 min",
    blocker: "Mancanza di tempo e cene frequenti fuori",
  });

  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    preferredTime: "Pomeriggio (14:00 - 18:00)",
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Animazione calcolo risultati del Quiz
  const handleNextToCalculate = () => {
    setIsCalculating(true);
    setCurrentStep(4);
    let progress = 15;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        setCalcProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsCalculating(false);
        }, 500);
      } else {
        setCalcProgress(progress);
      }
    }, 250);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Generatore link WhatsApp diretto con i dati del Quiz
  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Ciao! Ho completato il test su Instagram.\n\n` +
        `👤 Nome: ${leadForm.name || "Interessato"}\n` +
        `🎯 Obiettivo: ${quizAnswers.goal}\n` +
        `⏱ Disponibilità: ${quizAnswers.frequency}\n` +
        `🚧 Ostacolo principale: ${quizAnswers.blocker}\n\n` +
        `Vorrei ricevere la valutazione gratuita e capire se c'è posto per me questo mese!`
    );
    return `https://wa.me/393331234567?text=${text}`;
  };

  // --- STATO FAQ INTERATTIVE ---
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Funziona davvero se lavoro 9-10 ore al giorno e mangio spesso fuori?",
      a: "È stato progettato esattamente per questo. Oltre l'80% dei nostri allievi sono professionisti, imprenditori o manager con agende piene. Non ti chiederemo di pesare il cibo con il bilancino al ristorante, ma ti insegneremo una guida strategica per fare scelte intelligenti durante cene di lavoro e viaggi.",
    },
    {
      q: "Devo per forza andare in palestra o posso allenarmi a casa?",
      a: "Puoi scegliere tu al 100%. Il protocollo viene strutturato in base a dove preferisci allenarti e all'attrezzatura che hai (dalla palestra completa fino a due soli manubri o corpo libero a casa).",
    },
    {
      q: "Non sono costante: cosa mi garantisce che non mollerò dopo 2 settimane?",
      a: "La differenza fondamentale rispetto a una normale scheda di palestra è il supporto 1-a-1 continuo: hai un check video approfondito ogni settimana per verificare foto, misure ed energia, più la linea diretta WhatsApp per qualsiasi dubbio ogni singolo giorno. Non sarai mai lasciato solo.",
    },
    {
      q: "Cosa succede esattamente dopo che compilo il test qui sotto?",
      a: "Analizzeremo le tue risposte e ti contatteremo via WhatsApp per fissare la Sessione Strategica Gratuita di 20 minuti. In quella chiamata analizzeremo la tua situazione e ti mostreremo il piano d'azione esatto. Se riterremo entrambi che ci siano i presupposti per lavorare insieme, potrai iniziare il percorso; altrimenti avrai comunque una mappa chiara e gratuita.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden font-sans">
      {/* 1. BARRA D'URGENZA SUPERIORE (TIPICA DELLE ADS AD ALTA CONVERSIONE) */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-slate-950 text-xs sm:text-sm font-extrabold py-2 px-4 text-center tracking-tight shadow-md flex items-center justify-center gap-2">
        <Flame className="w-4 h-4 fill-slate-950" />
        <span>
          OFFERTA PROMOZIONALE SOCIAL: Solo <strong className="underline">4 posti rimasti</strong> per il programma con valutazione 1-a-1 gratuita inclusa!
        </span>
      </div>

      {/* SFONDO GLOW */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-amber-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-[40%] right-[5%] w-[450px] h-[450px] bg-orange-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] left-[25%] w-[600px] h-[400px] bg-emerald-600/5 blur-[160px] rounded-full" />
      </div>

      {/* HEADER PULITO */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-black text-slate-950 text-base shadow-lg shadow-amber-500/25">
              FP
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                FIT<span className="text-amber-400">PROTOCOL</span>™
              </span>
              <span className="block text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                Metodo Ricomposizione 90 Giorni
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#quiz-section"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all"
            >
              <span>Fai il Test Gratuito</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO SECTION DEDICATA A CHI VIENE DALLE ADS */}
        <section className="pt-12 sm:pt-20 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
            <Zap className="w-4 h-4 fill-amber-400" />
            <span>Niente diete da fame. Niente 2 ore al giorno in palestra.</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] max-w-4xl mx-auto">
            Raggiungi la tua migliore forma fisica in 90 giorni con{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent underline decoration-amber-500/50 decoration-2">
              3 sessioni da 45 min a settimana
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Il metodo scientifico di ricomposizione corporea creato per <strong>professionisti e persone impegnate</strong>: brucia il grasso addominale ostinato e definisci il tuo fisico senza rinunciare a cene di lavoro e vita sociale.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#quiz-section"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-extrabold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-slate-950 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-5 h-5 fill-slate-950" />
              <span>SCOPRI IL TUO PIANO IN 60 SECONDI</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* SOCIAL PROOF IMMEDIATA SOTTO IL TITOLO */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">4.9 / 5</span>
              <span className="text-slate-400">(420+ Allievi Trasformati)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-slate-200">Garanzia Risultato Soddisfatti o Rimborsati</span>
            </div>
          </div>
        </section>

        {/* 2. IL CUORE DELLA CONVERSIONE: IL QUIZ DI QUALIFICAZIONE INTERATTIVO */}
        <section id="quiz-section" className="py-12 sm:py-16 px-4 sm:px-6 max-w-3xl mx-auto">
          <div className="bg-slate-900/90 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
            {/* BADGE DI TEST */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Valutazione Gratuita di Idoneità
                </span>
              </div>
              <div className="text-xs font-bold text-slate-400">
                Passo {currentStep} di 4
              </div>
            </div>

            {/* STEP 1: OBIETTIVO */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white text-center">
                  1. Qual è il tuo obiettivo primario nei prossimi 90 giorni?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 text-center -mt-3">
                  Seleziona l&apos;obiettivo che descrive meglio il tuo punto di arrivo desiderato.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    {
                      title: "Bruciare Grasso Addominale",
                      desc: "Eliminare i chili di troppo e snellire la pancia",
                      icon: Flame,
                    },
                    {
                      title: "Ricomposizione Corporea",
                      desc: "Perdere grasso e definire muscoli contemporaneamente",
                      icon: Activity,
                    },
                    {
                      title: "Costruire Massa Pulita",
                      desc: "Aumentare le spalle, braccia e densità muscolare",
                      icon: TrendingUp,
                    },
                    {
                      title: "Energia & Postura",
                      desc: "Eliminare dolori alla schiena e sentirti in forma",
                      icon: Heart,
                    },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, goal: item.title });
                        setCurrentStep(2);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 group hover:border-amber-400 ${
                        quizAnswers.goal === item.title
                          ? "bg-amber-500/15 border-amber-500 text-white"
                          : "bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white">{item.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: TEMPO A DISPOSIZIONE */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white text-center">
                  2. Quante volte a settimana puoi dedicare all&apos;allenamento?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 text-center -mt-3">
                  Non mentire a te stesso: il programma deve adattarsi alla tua vita reale, non il contrario.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      label: "2 sessioni da 40-45 minuti",
                      sub: "Per chi ha un'agenda estremamente piena (Protocollo Alta Densità)",
                    },
                    {
                      label: "3 sessioni da 45-50 minuti (CONSIGLIATO)",
                      sub: "Il punto ideale per massima efficienza e risultati rapidi",
                    },
                    {
                      label: "4 o più sessioni a settimana",
                      sub: "Per chi vuole dedicare più tempo e accelerare al massimo",
                    },
                  ].map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, frequency: opt.label });
                        setCurrentStep(3);
                      }}
                      className="w-full p-4 rounded-2xl border bg-slate-950/70 border-slate-800 hover:border-amber-400 text-left transition-all flex items-center justify-between group hover:bg-slate-800/60"
                    >
                      <div>
                        <div className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                          {opt.label}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">{opt.sub}</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-slate-400 hover:text-white underline"
                  >
                    ← Torna indietro
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: OSTACOLO PRINCIPALE */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white text-center">
                  3. Qual è stato finora il tuo ostacolo più grande?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 text-center -mt-3">
                  Capire cosa non ha funzionato in passato è l&apos;unico modo per non ripetere lo stesso errore.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    "Mancanza di tempo tra lavoro, famiglia e impegni",
                    "Diete rigide da fame che non riesco a mantenere nel weekend",
                    "Mancanza di costanza quando mi alleno da solo senza qualcuno che mi guidi",
                    "Metabolismo apparentemente bloccato: faccio fatica a perdere l'ultimo grasso",
                  ].map((obs, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, blocker: obs });
                        handleNextToCalculate();
                      }}
                      className="w-full p-4 rounded-2xl border bg-slate-950/70 border-slate-800 hover:border-amber-400 text-left transition-all flex items-center justify-between group hover:bg-slate-800/60"
                    >
                      <span className="font-semibold text-sm text-slate-200 group-hover:text-amber-300">
                        {obs}
                      </span>
                      <Check className="w-5 h-5 text-slate-600 group-hover:text-amber-400" />
                    </button>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs text-slate-400 hover:text-white underline"
                  >
                    ← Torna indietro
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: ELABORAZIONE E SBLOCCO CANDIDATURA */}
            {currentStep === 4 && (
              <div>
                {isCalculating ? (
                  <div className="py-12 text-center space-y-5 animate-pulse">
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                      <Zap className="w-8 h-8 animate-spin" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Elaborazione del tuo Profilo Metabolico...
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Verifica compatibilità con il Metodo Ricomposizione 90 Giorni e calcolo del deficit calorico sostenibile.
                    </p>
                    <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden max-w-md mx-auto">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300"
                        style={{ width: `${calcProgress}%` }}
                      />
                    </div>
                  </div>
                ) : isSubmitted ? (
                  /* SCHERMATA FINALE DI SUCCESSO */
                  <div className="py-8 text-center space-y-6 animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 text-xs font-bold">
                      PROFILO IDONEO AL PROTOCOLLO
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      Complimenti {leadForm.name || "Campione"}! La tua richiesta è stata presa in carico.
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Abbiamo registrato le tue risposte. Per saltare la fila e ricevere subito l&apos;analisi strategica, puoi scriverci direttamente su WhatsApp cliccando qui sotto:
                    </p>

                    <div className="pt-2">
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-base bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/30 transition-all hover:scale-105"
                      >
                        <MessageCircle className="w-6 h-6 fill-slate-950" />
                        <span>APRI WHATSAPP & CONFERMA IL TUO POSTO</span>
                      </a>
                    </div>
                    <p className="text-xs text-slate-400">
                      Un nostro Coach ti risponderà personalmente entro poche ore lavorative.
                    </p>
                  </div>
                ) : (
                  /* MODULO PER RICEVERE IL PIANO E SBLOCCARE LA CALL */
                  <div className="space-y-6 animate-fadeIn">
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0" />
                      <div className="text-xs sm:text-sm text-amber-200">
                        <strong>Buone notizie!</strong> In base alle tue risposte ({quizAnswers.goal}, {quizAnswers.frequency}), il tuo profilo è idoneo al <strong>Protocollo Ricomposizione 90D</strong>.
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        Sblocca la tua Consulenza Strategica Gratuita (Valore 97€)
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Inserisci i tuoi dati per ricevere il piano preliminare e bloccare uno dei 4 posti rimasti:
                      </p>
                    </div>

                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Il tuo Nome di Battesimo *
                        </label>
                        <input
                          type="text"
                          required
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          placeholder="es. Andrea"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Numero di Telefono WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          placeholder="es. 340 1234567"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                        />
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          🔒 Ti scriveremo solo per confermare l&apos;orario della consulenza. Zero spam.
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Fascia oraria ideale per essere contattato
                        </label>
                        <select
                          value={leadForm.preferredTime}
                          onChange={(e) => setLeadForm({ ...leadForm, preferredTime: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                        >
                          <option>Mattina (09:00 - 13:00)</option>
                          <option>Pomeriggio (14:00 - 18:00)</option>
                          <option>Sera (18:30 - 20:30)</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl font-black text-base bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-slate-950 shadow-xl shadow-amber-500/30 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>INVIA E BLOCCA IL TUO POSTO GRATIS</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 3. CONFRONTO: METODO TRADIZIONALE VS FITPROTOCOL */}
        <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-slate-800/80">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Perché il 95% delle diete fallisce
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
              Basta sprecare mesi con approcci insostenibili
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* VECCHIO METODO */}
            <div className="p-6 sm:p-8 rounded-3xl bg-rose-950/20 border border-rose-900/40">
              <div className="flex items-center gap-3 text-rose-400 font-bold text-lg mb-6">
                <XCircle className="w-6 h-6 shrink-0" />
                <span>La solita palestra / diete standard:</span>
              </div>
              <ul className="space-y-4 text-slate-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <span><strong>5-6 giorni a settimana:</strong> Passi 2 ore al giorno tra macchinari senza sapere se stai facendo bene gli esercizi.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <span><strong>Diete restrittive estreme:</strong> Solo riso in bianco, petto di pollo e zero vita sociale fino a quando crolli nel weekend.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <span><strong>Nessun supporto reale:</strong> Ti danno una scheda fotocopiata e sei abbandonato a te stesso per i 3 mesi successivi.</span>
                </li>
              </ul>
            </div>

            {/* METODO FITPROTOCOL */}
            <div className="p-6 sm:p-8 rounded-3xl bg-amber-950/20 border-2 border-amber-500/60 shadow-xl shadow-amber-950/40">
              <div className="flex items-center gap-3 text-amber-300 font-bold text-lg mb-6">
                <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0" />
                <span>Il Metodo FitProtocol™:</span>
              </div>
              <ul className="space-y-4 text-slate-200 text-sm">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>3 sessioni da 45 minuti mirate:</strong> Lavoriamo sull&apos;intensità scientifica per stimolare il muscolo e accelerare il metabolismo.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Nutrizione Flessibile Sostenibile:</strong> Nessun alimento vietato. Puoi goderti la pizza del sabato e le cene di lavoro senza sensi di colpa.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Check Video Settimanale & WhatsApp 7/7:</strong> Un coach dedicato analizza i tuoi progressi ogni domenica e adatta il piano su misura.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. CASI STUDIO CON RISULTATI REALI (SOCIAL PROOF CONVERTITRICE) */}
        <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-slate-800/80">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Risultati Verificati
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
              Le trasformazioni dei nostri allievi
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Persone con vite piene e poco tempo che hanno scelto di smettere di rimandare.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
                    -9.4 KG IN 12 SETTIMANE
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  &ldquo;Lavoro 10 ore al giorno in studio legale. Pensavo fosse impossibile rimettermi in sesto. In 3 mesi ho perso quasi 10 kg di grasso addominale allenandomi solo nella pausa pranzo per 45 minuti.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 font-black text-slate-950 flex items-center justify-center text-sm">
                  FL
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Francesco L., 38 anni</div>
                  <div className="text-xs text-slate-400">Avvocato & Padre di 2 figli</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-400 text-xs font-bold border border-amber-800">
                    RICOMPOSIZIONE COMPLETA
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  &ldquo;La cosa migliore è che non mi sento a dieta. Il sabato mangio la pizza con gli amici e continuo a vedere l&apos;addome definirsi. Il check settimanale su WhatsApp ti tiene davvero sul pezzo.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-500 font-black text-slate-950 flex items-center justify-center text-sm">
                  MD
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Matteo D., 31 anni</div>
                  <div className="text-xs text-slate-400">Software Engineer & Imprenditore</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
                    -12.8 KG & ENERGIA AL TOP
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  &ldquo;Avevo provato decine di diete fallite dopo 2 settimane. Con FitProtocol ho imparato come mangiare senza stress e ho ritrovato un&apos;energia pazzesca che mi aiuta anche nel lavoro.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-500 font-black text-slate-950 flex items-center justify-center text-sm">
                  GS
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Gabriele S., 45 anni</div>
                  <div className="text-xs text-slate-400">Commercialista & Titolare di Studio</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. COSA INCLUDE IL PERCORSO (VALUE STACK) */}
        <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-slate-800/80">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Supporto Completo Chiavi in Mano
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
              Cosa include il Protocollo 90 Giorni
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">
                  1. Scheda di Allenamento Personalizzata su App Dedicata
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Video esplicativi in 4K per ogni esercizio, carichi tracciati automaticamente e timer di recupero. Sai esattamente cosa fare in ogni singolo minuto.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">
                  2. Piano Nutrizionale Flessibile & Guida per Ristoranti
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Niente cibi noiosi o pesate maniacali. Imparerai le porzioni visive e le strategie per goderti aperitivi, pranzi di lavoro e cene fuori continuando a perdere grasso.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">
                  3. Check-In Video Settimanale di Verifica
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Ogni domenica carichi foto e misure: il tuo Coach dedicato analizza la risposta del tuo corpo e calibra calorie e allenamento per garantire progressi continui.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">
                  4. Linea Diretta Privata su WhatsApp 7/7
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                  Un dubbio sul menù al ristorante? Una correzione rapida all&apos;esecuzione di un esercizio? Ti basta inviare un messaggio o un breve video per ricevere feedback immediato.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. GARANZIA A RISCHIO ZERO */}
        <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-amber-950/40 to-slate-900 border-2 border-amber-500/50 text-center relative overflow-hidden">
            <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              La Nostra Garanzia &ldquo;Risultato o Rimborsato&rdquo; a 30 Giorni
            </h3>
            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Siamo così certi dell&apos;efficacia del nostro metodo scientifico che ci assumiamo noi tutto il rischio: se segui il protocollo per i primi 30 giorni e non vedi un cambiamento visibile e misurabile, ti rimborsiamo ogni singolo centesimo senza discussioni.
            </p>
          </div>
        </section>

        {/* 7. DOMANDE FREQUENTI (FAQ) */}
        <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto border-t border-slate-800/80">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Domande Frequenti
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-white hover:text-amber-300 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-amber-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. CTA FINALE */}
        <section className="py-16 px-4 sm:px-6 text-center border-t border-slate-800/80 bg-slate-950">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Smetti di rimandare la forma fisica che meriti
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Fai il test gratuito in 60 secondi e scopri se il tuo profilo è idoneo per i 4 posti disponibili questo mese.
            </p>
            <div className="pt-2">
              <a
                href="#quiz-section"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-black bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-slate-950 shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Zap className="w-5 h-5 fill-slate-950" />
                <span>FAI IL TEST GRATUITO ORA</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-black py-8 px-4 text-center text-slate-500 text-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>FITPROTOCOL™ Online Coaching</span>
          </div>
          <p>© 2026 FitProtocol Inc. Tutti i diritti riservati.</p>
          <div className="flex gap-4 text-slate-400">
            <span>Privacy Policy</span>
            <span>Termini & Condizioni</span>
          </div>
        </div>
      </footer>

      {/* 9. STICKY MOBILE CONVERSION BAR (FISSA IN BASSO SU CELLULARE) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-slate-950/95 border-t border-slate-800 backdrop-blur-lg flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>Solo 4 posti rimasti</span>
          </div>
          <div className="text-[10px] text-slate-400">Valutazione 1-a-1 inclusa</div>
        </div>
        <a
          href="#quiz-section"
          className="px-4 py-2.5 rounded-xl font-extrabold text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
        >
          Fai il Test ⚡
        </a>
      </div>
    </div>
  );
}
