"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { COACHES, Coach } from "@/lib/data";
import { translations, Language } from "@/lib/translations";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Zap,
  TrendingUp,
  ShieldCheck,
  MessageCircle,
  Star,
  ChevronDown,
  ChevronUp,
  Check,
  Sparkles,
  Flame,
  Activity,
  Heart,
  Scale,
  Calendar,
  Sun,
  Moon,
  Globe,
  UserCheck,
  ShieldAlert,
  Play,
  Pause,
  Volume2,
  X,
  Send,
  Sliders,
  Award,
} from "lucide-react";

export default function Home() {
  // --- TEMA E LINGUA ---
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [lang, setLang] = useState<Language>("it");
  const t = translations[lang];

  // --- COUNTDOWN TIMER TICKING ---
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 44, seconds: 18 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- SOCIAL PROOF TOAST (NOTIFICHE LIVE DI CONVERSIONE) ---
  const [showToast, setShowToast] = useState<boolean>(true);
  const [toastIndex, setToastIndex] = useState<number>(0);

  const liveToasts = [
    { name: "Marco da Milano", action: "ha appena prenotato la valutazione con Coach Valenti", time: "2 min fa" },
    { name: "Elena da Torino", action: "ha iniziato il percorso 90D con Coach Rostagno", time: "6 min fa" },
    { name: "Davide da Bologna", action: "ha completato il test di idoneità (Match: 98%)", time: "11 min fa" },
    { name: "Francesco da Roma", action: "ha bloccato l'ultimo posto con Coach Moretti", time: "15 min fa" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowToast(false);
      setTimeout(() => {
        setToastIndex((prev) => (prev + 1) % liveToasts.length);
        setShowToast(true);
      }, 800);
    }, 9000);
    return () => clearInterval(interval);
  }, [liveToasts.length]);

  // --- SLIDER INTERATTIVO PRIMA / DOPO ---
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // --- SIMULATORE MESSAGGIO VOCALE WHATSAPP ---
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);
  const [voiceProgress, setVoiceProgress] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingVoice) {
      interval = setInterval(() => {
        setVoiceProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingVoice(false);
            return 0;
          }
          return prev + 2.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlayingVoice]);

  // --- FLOATING WHATSAPP CHAT DRAWER ---
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // --- STATO DEL QUIZ DI CONVERSIONE (STEP FUNNEL) ---
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [calcProgress, setCalcProgress] = useState<number>(15);

  const [selectedGoalKey, setSelectedGoalKey] = useState<string>("fat_loss");
  const [quizAnswers, setQuizAnswers] = useState({
    goal: "Bruciare Grasso Addominale",
    frequency: "3 sessioni da 45 min",
    blocker: "Mancanza di tempo per il lavoro/famiglia",
  });

  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    preferredTime: "Pomeriggio (14:00 - 18:00)",
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Logica matching coach
  const getMatchedCoach = (): Coach => {
    switch (selectedGoalKey) {
      case "fat_loss":
        return COACHES.find((c) => c.id === "coach-marco") || COACHES[0];
      case "hypertrophy":
        return COACHES.find((c) => c.id === "coach-davide") || COACHES[1];
      case "female_recomp":
        return COACHES.find((c) => c.id === "coach-elena") || COACHES[2];
      case "posture":
        return COACHES.find((c) => c.id === "coach-luca") || COACHES[3];
      default:
        return COACHES[0];
    }
  };

  const matchedCoach = getMatchedCoach();

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
        }, 400);
      } else {
        setCalcProgress(progress);
      }
    }, 200);
  };

  const sanitizeInput = (val: string) => {
    return val.replace(/[<>'"/]/g, "").trim();
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeInput(leadForm.name);
    const cleanPhone = sanitizeInput(leadForm.phone);
    setLeadForm({ ...leadForm, name: cleanName, phone: cleanPhone });
    setIsSubmitted(true);
  };

  const getWhatsAppLink = (customMsg?: string) => {
    const text = encodeURIComponent(
      customMsg ||
        `Ciao Coach ${matchedCoach.name}!\n\n` +
          `Ho completato il test su Instagram e il sistema mi ha abbinato a te come formatore ideale (Match: 98.4%).\n\n` +
          `👤 Nome: ${leadForm.name || "Nuovo Allievo"}\n` +
          `🎯 Obiettivo: ${quizAnswers.goal}\n` +
          `⏱ Disponibilità: ${quizAnswers.frequency}\n` +
          `🚧 Ostacolo principale: ${quizAnswers.blocker}\n\n` +
          `Vorrei ricevere la valutazione 1-a-1 e capire se hai disponibilità per seguirmi!`
    );
    return `https://wa.me/${matchedCoach.phone}?text=${text}`;
  };

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: lang === "it"
        ? "Funziona davvero se lavoro 9-10 ore al giorno e mangio spesso fuori?"
        : "Does this really work if I work 9-10 hours daily and frequently dine out?",
      a: lang === "it"
        ? "È stato progettato esattamente per questo. Oltre l'80% dei nostri allievi sono professionisti e manager con agende piene. Ti insegneremo a gestire cene di lavoro e ristoranti continuando a perdere grasso."
        : "Engineered specifically for busy schedules. Over 80% of our clients are executives and founders. We coach you on restaurant meal tactics so you burn fat without isolation.",
    },
    {
      q: lang === "it"
        ? "Devo per forza andare in palestra o posso allenarmi a casa?"
        : "Must I go to a commercial gym or can I train at home?",
      a: lang === "it"
        ? "Scegli tu al 100%. Il tuo coach adatta la scheda agli attrezzi che hai a disposizione, dal corpo libero a casa fino a una palestra attrezzata."
        : "You choose 100%. Your assigned coach calibrates the routine around your available equipment, from home dumbbells to full gym facilities.",
    },
    {
      q: lang === "it"
        ? "Come viene scelto il mio Coach/Istruttore specifico?"
        : "How is my specific Coach / Instructor selected?",
      a: lang === "it"
        ? "In base all'obiettivo e agli ostacoli indicati nel test, il nostro algoritmo ti assegna al coach specializzato nella tua casistica (es. grasso ostinato, ipertrofia, tonificazione femminile o postura)."
        : "Based on your quiz goals and obstacles, our routing matches you with the specialist dedicated to your bio-profile (stubborn fat, hypertrophy, female toning, or posture).",
    },
    {
      q: lang === "it"
        ? "Cosa succede dopo che invio la richiesta?"
        : "What happens after submitting the evaluation form?",
      a: lang === "it"
        ? "Il tuo coach analizzerà le tue risposte e ti contatterà via WhatsApp per fissare la Sessione Strategica Gratuita di 20 minuti senza impegno."
        : "Your coach reviews your responses and messages you on WhatsApp to schedule your complimentary 20-minute strategy audit.",
    },
  ];

  const isDark = theme === "dark";

  return (
    <div
      className={`relative min-h-screen font-sans transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* 1. TOP URGENCY BAR CON COUNTDOWN TICKING */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-slate-950 text-xs sm:text-sm font-extrabold py-2 px-4 text-center tracking-tight shadow-md flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        <div className="flex items-center gap-1.5">
          <Flame className="w-4 h-4 fill-slate-950 animate-bounce" />
          <span>{t.urgencyBar}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-0.5 rounded-full text-xs font-mono font-black">
          <span>{t.countdownLabel}</span>
          <span className="bg-slate-950 text-amber-400 px-1.5 py-0.5 rounded">
            {String(timeLeft.hours).padStart(2, "0")}h
          </span>
          :
          <span className="bg-slate-950 text-amber-400 px-1.5 py-0.5 rounded">
            {String(timeLeft.minutes).padStart(2, "0")}m
          </span>
          :
          <span className="bg-slate-950 text-amber-400 px-1.5 py-0.5 rounded">
            {String(timeLeft.seconds).padStart(2, "0")}s
          </span>
        </div>
      </div>

      {/* SFONDO GLOW */}
      {isDark && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-amber-500/10 blur-[140px] rounded-full" />
          <div className="absolute top-[40%] right-[5%] w-[450px] h-[450px] bg-orange-600/10 blur-[150px] rounded-full" />
        </div>
      )}

      {/* HEADER PRINCIPALE */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${
          isDark
            ? "bg-slate-950/85 border-slate-800/80"
            : "bg-white/90 border-slate-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-black text-slate-950 text-base shadow-lg shadow-amber-500/25">
              FP
            </div>
            <div>
              <span className={`font-extrabold text-lg tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                {t.navBrand}
                <span className="text-amber-500">{t.navBrandSuffix}</span>
              </span>
              <span className="block text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                {t.navTagline}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setLang(lang === "it" ? "en" : "it")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                  : "bg-white border-slate-300 text-slate-700 hover:text-black"
              }`}
              title="Cambia Lingua / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang.toUpperCase()}</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-2 rounded-xl border transition-colors ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-amber-400 hover:text-amber-300"
                  : "bg-white border-slate-300 text-slate-700 hover:text-black"
              }`}
              title="Passa a modalità chiara/scura"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              href="/admin"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                isDark
                  ? "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-amber-500/50"
                  : "bg-slate-100 border-slate-300 text-slate-800 hover:border-slate-400"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.navAdmin}</span>
            </Link>

            <a
              href="#quiz-section"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all"
            >
              <span>{t.navCta}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="pt-12 sm:pt-20 pb-14 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
            <Zap className="w-4 h-4 fill-amber-500" />
            <span>{t.heroBadge}</span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] max-w-4xl mx-auto ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {t.heroTitle1}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent underline decoration-amber-500/40 decoration-2">
              {t.heroTitleHighlight}
            </span>
          </h1>

          <p
            className={`mt-6 text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {t.heroDesc}
          </p>

          {/* PROGRESSO POSTI DISPONIBILI */}
          <div className="mt-8 max-w-md mx-auto p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-amber-500 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-500" /> {t.seatsProgress}
              </span>
              <span className={isDark ? "text-white" : "text-slate-900"}>73% Assegnati</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full w-[73%]" />
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#quiz-section"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-extrabold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-slate-950 shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-5 h-5 fill-slate-950" />
              <span>{t.heroCta}</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <span className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                {t.heroProof1}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className={`font-semibold ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                {t.heroProof2}
              </span>
            </div>
          </div>
        </section>

        {/* 2. SLIDER INTERATTIVO PRIMA / DOPO */}
        <section
          className={`py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t ${
            isDark ? "border-slate-800/80" : "border-slate-200"
          }`}
        >
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center justify-center gap-1.5">
              <Sliders className="w-4 h-4" /> Risultati Documentati
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black mt-2 ${isDark ? "text-white" : "text-slate-900"}`}>
              {t.sliderTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">{t.sliderSub}</p>
          </div>

          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
              isDark ? "bg-slate-900/80 border-slate-800" : "bg-white border-slate-200"
            }`}
          >
            {/* Visualizzatore di Confronto Metrico */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Box PRIMA */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  sliderPosition < 50
                    ? "border-amber-500 bg-amber-500/10"
                    : isDark
                    ? "border-slate-800 bg-slate-950/60"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300">
                    {t.sliderBefore}
                  </span>
                  <span className="text-xs text-rose-400 font-bold">22.8% Massa Grassa</span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Peso Corporeo:</span>
                    <span className="font-bold">88.4 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Giro Vita Addome:</span>
                    <span className="font-bold">96 cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Energia Giornaliera:</span>
                    <span className="font-bold text-rose-400">Bassa (Crolli post pranzo)</span>
                  </div>
                </div>
              </div>

              {/* Box DOPO */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  sliderPosition >= 50
                    ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                    : isDark
                    ? "border-slate-800 bg-slate-950/60"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500 text-slate-950">
                    {t.sliderAfter}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">12.6% Massa Grassa</span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Peso Corporeo:</span>
                    <span className="font-bold text-emerald-400">78.6 kg (-9.8 KG)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Giro Vita Addome:</span>
                    <span className="font-bold text-emerald-400">84 cm (-12 CM)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tono Addome & Spalle:</span>
                    <span className="font-bold text-emerald-400">+3.4 kg Massa Magra</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider interattivo */}
            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-slate-400">Settimana 0</span>
                <span className="text-amber-500">Trascina per esplorare l&apos;evoluzione</span>
                <span className="text-emerald-400">Settimana 12</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>
        </section>

        {/* 3. SIMULATORE MESSAGGIO VOCALE WHATSAPP */}
        <section
          className={`py-12 px-4 sm:px-6 max-w-3xl mx-auto border-t ${
            isDark ? "border-slate-800/80" : "border-slate-200"
          }`}
        >
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden ${
              isDark
                ? "bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 border-emerald-500/40"
                : "bg-emerald-50/70 border-emerald-300"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                <Volume2 className="w-4 h-4" />
                <span>{t.voiceTitle}</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">WhatsApp Audio</span>
            </div>

            <p className="text-xs text-slate-400 mb-6">{t.voiceSub}</p>

            {/* Card Lettore Vocale WhatsApp */}
            <div
              className={`p-4 rounded-2xl border flex items-center gap-4 ${
                isDark ? "bg-slate-950/80 border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <button
                type="button"
                onClick={() => setIsPlayingVoice(!isPlayingVoice)}
                className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/25 transition-transform active:scale-95"
              >
                {isPlayingVoice ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
              </button>

              <div className="flex-1">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className={isDark ? "text-white" : "text-slate-900"}>{t.voiceSender}</span>
                  <span className="font-mono text-emerald-500">
                    {isPlayingVoice ? `0:${Math.floor(voiceProgress * 0.38).toString().padStart(2, "0")}` : t.voiceDuration}
                  </span>
                </div>

                {/* Onda sonora animata WhatsApp */}
                <div className="flex items-center gap-1 h-6">
                  {[4, 12, 18, 8, 22, 15, 10, 24, 16, 12, 20, 8, 14, 22, 18, 12, 6, 16, 20, 10, 14, 8].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        isPlayingVoice
                          ? "bg-emerald-400 animate-pulse"
                          : i < (voiceProgress / 100) * 22
                          ? "bg-emerald-500"
                          : isDark
                          ? "bg-slate-800"
                          : "bg-slate-300"
                      }`}
                      style={{ height: isPlayingVoice ? `${Math.max(6, (h * (i % 3 + 1)) % 24)}px` : `${h}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-slate-950/40 text-xs text-slate-400 italic">
              &ldquo;Coach, volevo dirti che ieri ho provato il completo di 3 anni fa e mi va di nuovo perfetto! La cosa incredibile è che venerdì sono andato a cena fuori con i clienti senza sentirmi escluso... sei un fenomeno.&rdquo;
            </div>
          </div>
        </section>

        {/* 4. IL QUIZ CON MATCHING INTELLIGENTE DEL COACH */}
        <section id="quiz-section" className="py-12 sm:py-16 px-4 sm:px-6 max-w-3xl mx-auto">
          <div
            className={`rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl border-2 transition-all ${
              isDark
                ? "bg-slate-900/90 border-amber-500/40 text-slate-100"
                : "bg-white border-amber-500/50 text-slate-900 shadow-amber-500/10"
            }`}
          >
            <div
              className={`flex items-center justify-between pb-6 mb-6 border-b ${
                isDark ? "border-slate-800" : "border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                  {t.quizTitle}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-400">
                {t.quizStep} {currentStep} {t.quizOf} 4
              </div>
            </div>

            {/* STEP 1: OBIETTIVO */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h3
                  className={`text-xl sm:text-2xl font-extrabold text-center ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {t.step1Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 text-center -mt-3">
                  {t.step1Sub}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    {
                      key: "fat_loss",
                      title: lang === "it" ? "Bruciare Grasso Addominale" : "Burn Stubborn Belly Fat",
                      desc: lang === "it" ? "Deficit calorico scientifico per snellire la pancia" : "Scientific caloric deficit to flatten stomach",
                      icon: Flame,
                      coachHint: "Coach Marco Valenti",
                    },
                    {
                      key: "female_recomp",
                      title: lang === "it" ? "Tonificazione & Ricomposizione" : "Female Toning & Recomp",
                      desc: lang === "it" ? "Gambe sode, glutei e drenaggio liquidi" : "Tight glutes, core and water retention balance",
                      icon: Activity,
                      coachHint: "Coach Elena Rostagno",
                    },
                    {
                      key: "hypertrophy",
                      title: lang === "it" ? "Costruire Massa Pulita" : "Build Clean Lean Muscle",
                      desc: lang === "it" ? "Progressione carichi e densità spalle/braccia" : "Progressive overload for broad shoulders & arms",
                      icon: TrendingUp,
                      coachHint: "Coach Davide Moretti",
                    },
                    {
                      key: "posture",
                      title: lang === "it" ? "Energia & Postura da Ufficio" : "Desk Posture & Vitality",
                      desc: lang === "it" ? "Eliminazione dolori alla schiena e mobilità" : "Back tightness relief & pain-free energy",
                      icon: Heart,
                      coachHint: "Dott. Luca Barbieri",
                    },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => {
                        setSelectedGoalKey(item.key);
                        setQuizAnswers({ ...quizAnswers, goal: item.title });
                        setCurrentStep(2);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 group hover:border-amber-400 ${
                        selectedGoalKey === item.key
                          ? "bg-amber-500/15 border-amber-500"
                          : isDark
                          ? "bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-850"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                        <div className="text-[11px] font-semibold text-amber-500 mt-2 flex items-center gap-1">
                          <UserCheck className="w-3 h-3" />
                          <span>Specialista: {item.coachHint}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: TEMPO */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h3
                  className={`text-xl sm:text-2xl font-extrabold text-center ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {t.step2Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 text-center -mt-3">
                  {t.step2Sub}
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      label: lang === "it" ? "2 sessioni da 40-45 minuti" : "2 sessions of 40-45 mins",
                      sub: lang === "it" ? "Protocollo Alta Densità per agende dense" : "High-density protocol for packed schedules",
                    },
                    {
                      label: lang === "it" ? "3 sessioni da 45-50 minuti (CONSIGLIATO)" : "3 sessions of 45-50 mins (RECOMMENDED)",
                      sub: lang === "it" ? "Punto ottimale per velocità ed equilibrio" : "Optimal balance for rapid recomposition",
                    },
                    {
                      label: lang === "it" ? "4 o più sessioni a settimana" : "4 or more sessions per week",
                      sub: lang === "it" ? "Massima frequenza per accelerare i risultati" : "Maximum frequency for accelerated progression",
                    },
                  ].map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, frequency: opt.label });
                        setCurrentStep(3);
                      }}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group hover:border-amber-400 ${
                        isDark
                          ? "bg-slate-950/70 border-slate-800 text-slate-200 hover:bg-slate-800/60"
                          : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-sm group-hover:text-amber-500 transition-colors">
                          {opt.label}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">{opt.sub}</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-slate-400 hover:text-amber-500 underline"
                  >
                    ← {lang === "it" ? "Torna indietro" : "Back"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: OSTACOLO */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <h3
                  className={`text-xl sm:text-2xl font-extrabold text-center ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {t.step3Title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 text-center -mt-3">
                  {t.step3Sub}
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    lang === "it"
                      ? "Mancanza di tempo tra lavoro, impegni e cene frequenti fuori"
                      : "Lack of time between long work hours, travel and frequent dining out",
                    lang === "it"
                      ? "Diete rigide da fame che non riesco a mantenere nel tempo"
                      : "Strict starvation diets that are impossible to maintain on weekends",
                    lang === "it"
                      ? "Mancanza di costanza quando mi alleno da solo senza guida"
                      : "Lack of consistency when working out alone with no accountability",
                    lang === "it"
                      ? "Metabolismo bloccato o dolori articolari da postura sedentaria"
                      : "Sluggish metabolism or postural back/neck pain from desk sitting",
                  ].map((obs, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, blocker: obs });
                        handleNextToCalculate();
                      }}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group hover:border-amber-400 ${
                        isDark
                          ? "bg-slate-950/70 border-slate-800 text-slate-200 hover:bg-slate-800/60"
                          : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
                      }`}
                    >
                      <span className="font-semibold text-sm group-hover:text-amber-500">
                        {obs}
                      </span>
                      <Check className="w-5 h-5 text-slate-400 group-hover:text-amber-500" />
                    </button>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs text-slate-400 hover:text-amber-500 underline"
                  >
                    ← {lang === "it" ? "Torna indietro" : "Back"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: RISULTATO E MATCH COACH */}
            {currentStep === 4 && (
              <div>
                {isCalculating ? (
                  <div className="py-12 text-center space-y-5 animate-pulse">
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
                      <Zap className="w-8 h-8 animate-spin" />
                    </div>
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {t.calculatingTitle}
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      {t.calculatingDesc}
                    </p>
                    <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden max-w-md mx-auto">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300"
                        style={{ width: `${calcProgress}%` }}
                      />
                    </div>
                  </div>
                ) : isSubmitted ? (
                  <div className="py-8 text-center space-y-6 animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
                      {t.matchBadge}
                    </div>
                    <h3 className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                      {t.leadSuccessTitle}
                    </h3>
                    <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                      {t.leadSuccessSub}
                    </p>

                    <div
                      className={`p-5 rounded-2xl border text-left max-w-md mx-auto flex items-center gap-4 ${
                        isDark ? "bg-slate-950 border-amber-500/40" : "bg-slate-50 border-amber-400"
                      }`}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 font-black text-slate-950 flex items-center justify-center text-lg shrink-0 shadow-lg">
                        {matchedCoach.avatar}
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-amber-500">
                          {t.matchedCoachTitle}
                        </div>
                        <div className={`font-black text-base ${isDark ? "text-white" : "text-slate-900"}`}>
                          {matchedCoach.name}
                        </div>
                        <div className="text-xs text-slate-400">{matchedCoach.role}</div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-base bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/30 transition-all hover:scale-105"
                      >
                        <MessageCircle className="w-6 h-6 fill-slate-950" />
                        <span>{t.leadWhatsAppCta}</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fadeIn">
                    <div
                      className={`p-5 rounded-2xl border relative overflow-hidden ${
                        isDark
                          ? "bg-gradient-to-r from-amber-950/30 to-slate-950 border-amber-500/50"
                          : "bg-amber-50/70 border-amber-400"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 font-black text-slate-950 flex items-center justify-center text-lg shrink-0 shadow-lg shadow-amber-500/20">
                          {matchedCoach.avatar}
                        </div>
                        <div>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-500 text-[11px] font-extrabold uppercase mb-1">
                            <Sparkles className="w-3 h-3" />
                            <span>{t.matchBadge}</span>
                          </div>
                          <h4 className={`text-lg font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                            {matchedCoach.name}
                          </h4>
                          <p className="text-xs text-amber-500 font-semibold">{matchedCoach.role}</p>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {lang === "it" ? matchedCoach.bioIt : matchedCoach.bioEn}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className={`text-xl sm:text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                        {t.leadFormTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">{t.leadFormSub}</p>
                    </div>

                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          {t.leadNameLabel}
                        </label>
                        <input
                          type="text"
                          required
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          placeholder={lang === "it" ? "es. Marco" : "e.g. Alex"}
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-amber-500 transition-colors ${
                            isDark
                              ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                              : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          {t.leadPhoneLabel}
                        </label>
                        <input
                          type="tel"
                          required
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          placeholder="es. 340 1234567"
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-amber-500 transition-colors ${
                            isDark
                              ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                              : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                          }`}
                        />
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          {t.leadPhoneNotice}
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          {t.leadTimeLabel}
                        </label>
                        <select
                          value={leadForm.preferredTime}
                          onChange={(e) => setLeadForm({ ...leadForm, preferredTime: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-amber-500 transition-colors ${
                            isDark
                              ? "bg-slate-950 border-slate-800 text-white"
                              : "bg-white border-slate-300 text-slate-900"
                          }`}
                        >
                          <option>{t.leadTimeMorning}</option>
                          <option>{t.leadTimeAfternoon}</option>
                          <option>{t.leadTimeEvening}</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl font-black text-base bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-slate-950 shadow-xl shadow-amber-500/30 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>{t.leadSubmitCta}</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 5. CONFRONTO: METODO VECCHIO VS NUOVO */}
        <section
          className={`py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t ${
            isDark ? "border-slate-800/80" : "border-slate-200"
          }`}
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              {t.compareSectionTag}
            </span>
            <h2
              className={`text-2xl sm:text-4xl font-black mt-2 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {t.compareSectionTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div
              className={`p-6 sm:p-8 rounded-3xl border ${
                isDark
                  ? "bg-rose-950/20 border-rose-900/40 text-slate-300"
                  : "bg-rose-50/60 border-rose-200 text-slate-700"
              }`}
            >
              <div className="flex items-center gap-3 text-rose-500 font-bold text-lg mb-6">
                <XCircle className="w-6 h-6 shrink-0" />
                <span>{t.oldWayTitle}</span>
              </div>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <span>{t.oldWay1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <span>{t.oldWay2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <span>{t.oldWay3}</span>
                </li>
              </ul>
            </div>

            <div
              className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl ${
                isDark
                  ? "bg-amber-950/20 border-amber-500/60 text-slate-200 shadow-amber-950/40"
                  : "bg-amber-50/60 border-amber-500/80 text-slate-800 shadow-amber-500/10"
              }`}
            >
              <div className="flex items-center gap-3 text-amber-500 font-bold text-lg mb-6">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <span>{t.newWayTitle}</span>
              </div>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t.newWay1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t.newWay2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{t.newWay3}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. VALUE STACK */}
        <section
          className={`py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t ${
            isDark ? "border-slate-800/80" : "border-slate-200"
          }`}
        >
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              {t.valueSub}
            </span>
            <h2
              className={`text-2xl sm:text-4xl font-black mt-2 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {t.valueTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { title: t.val1Title, desc: t.val1Desc, icon: Activity },
              { title: t.val2Title, desc: t.val2Desc, icon: Scale },
              { title: t.val3Title, desc: t.val3Desc, icon: Calendar },
              { title: t.val4Title, desc: t.val4Desc, icon: MessageCircle },
            ].map((v, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl border flex items-start gap-4 ${
                  isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                  <v.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold text-base ${isDark ? "text-white" : "text-slate-900"}`}>
                    {v.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. GARANZIA */}
        <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
          <div
            className={`p-8 sm:p-10 rounded-3xl border-2 text-center relative overflow-hidden ${
              isDark
                ? "bg-gradient-to-b from-amber-950/40 to-slate-900 border-amber-500/50"
                : "bg-amber-50 border-amber-400 text-slate-800"
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
              {t.guaranteeTitle}
            </h3>
            <p
              className={`mt-4 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {t.guaranteeDesc}
            </p>
          </div>
        </section>

        {/* 8. FAQ */}
        <section
          className={`py-16 px-4 sm:px-6 max-w-3xl mx-auto border-t ${
            isDark ? "border-slate-800/80" : "border-slate-200"
          }`}
        >
          <div className="text-center mb-10">
            <h2 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
              {t.faqTitle}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border overflow-hidden ${
                    isDark ? "bg-slate-900/60 border-slate-800/80" : "bg-white border-slate-200 shadow-sm"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className={`w-full p-5 text-left flex items-center justify-between gap-4 font-semibold transition-colors ${
                      isDark ? "text-white hover:text-amber-400" : "text-slate-900 hover:text-amber-600"
                    }`}
                  >
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-amber-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div
                      className={`px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed border-t ${
                        isDark ? "text-slate-300 border-slate-800/40" : "text-slate-600 border-slate-100"
                      }`}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 9. CTA FINALE */}
        <section
          className={`py-16 px-4 sm:px-6 text-center border-t ${
            isDark ? "border-slate-800/80 bg-slate-950" : "border-slate-200 bg-slate-100"
          }`}
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className={`text-3xl sm:text-4xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
              {t.finalCtaTitle}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">{t.finalCtaDesc}</p>
            <div className="pt-2">
              <a
                href="#quiz-section"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-black bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-slate-950 shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Zap className="w-5 h-5 fill-slate-950" />
                <span>{t.finalCtaBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className={`border-t py-8 px-4 text-center text-xs ${
          isDark ? "border-slate-900 bg-black text-slate-500" : "border-slate-200 bg-white text-slate-500"
        }`}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>FITPROTOCOL™ Online Coaching Network</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-amber-500 transition-colors">
              HQ Admin Portal
            </Link>
            <span>© 2026 FitProtocol Inc.</span>
          </div>
        </div>
      </footer>

      {/* 10. SOCIAL PROOF LIVE TOAST (FOMO NOTIFICATION IN BASSO A SINISTRA) */}
      {showToast && (
        <div className="fixed bottom-6 left-6 z-50 animate-slideUp max-w-sm">
          <div
            className={`p-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-center gap-3 ${
              isDark
                ? "bg-slate-900/90 border-slate-700/80 text-white"
                : "bg-white/95 border-slate-300 text-slate-900"
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1 pr-1">
              <div className="text-xs font-bold leading-tight">
                {liveToasts[toastIndex].name}
              </div>
              <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                {liveToasts[toastIndex].action}
              </div>
              <div className="text-[10px] text-amber-500 font-semibold mt-1">
                {liveToasts[toastIndex].time}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowToast(false)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 11. FLOATING WHATSAPP CHAT BUTTON & DRAWER (IN BASSO A DESTRA) */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen ? (
          <button
            type="button"
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all relative"
            title="Apri Chat WhatsApp con il Coach"
          >
            <MessageCircle className="w-7 h-7 fill-slate-950" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-[10px] font-black text-slate-950 flex items-center justify-center animate-pulse">
              1
            </span>
          </button>
        ) : (
          <div
            className={`w-80 sm:w-88 rounded-3xl border shadow-2xl overflow-hidden animate-scaleIn backdrop-blur-2xl ${
              isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-300"
            }`}
          >
            {/* Header del Drawer */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-slate-950 text-white font-bold flex items-center justify-center text-xs">
                    {matchedCoach.avatar}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
                </div>
                <div>
                  <div className="font-bold text-sm leading-tight">{matchedCoach.name}</div>
                  <div className="text-[11px] text-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span>{t.chatStatus}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="p-1 rounded-lg hover:bg-emerald-700 text-white/80"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Corpo della Chat */}
            <div
              className={`p-4 space-y-3 text-xs leading-relaxed max-h-72 overflow-y-auto ${
                isDark ? "bg-slate-950/70" : "bg-slate-50"
              }`}
            >
              <div className="p-3 rounded-2xl rounded-tl-sm bg-emerald-500/15 border border-emerald-500/30 text-slate-200">
                {t.chatBubble}
              </div>

              {/* Quick Prompt Chips */}
              <div className="pt-2 space-y-1.5">
                {[
                  "Quanto costa il percorso?",
                  "Non ho mai fatto palestra, è adatto?",
                  "Posso allenarmi solo a casa?",
                ].map((chip, idx) => (
                  <a
                    key={idx}
                    href={getWhatsAppLink(`Ciao Coach! ${chip}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:border-emerald-500 hover:text-white transition-colors"
                  >
                    💬 {chip}
                  </a>
                ))}
              </div>
            </div>

            {/* Footer con CTA diretta WhatsApp */}
            <div className="p-3 border-t border-slate-800 bg-slate-900/90">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>{t.chatCta}</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 12. STICKY BOTTOM BAR SU MOBILE */}
      <div
        className={`sm:hidden fixed bottom-0 left-0 right-0 z-40 p-3 border-t backdrop-blur-lg flex items-center justify-between gap-3 shadow-2xl ${
          isDark ? "bg-slate-950/95 border-slate-800" : "bg-white/95 border-slate-200"
        }`}
      >
        <div>
          <div className="text-[11px] font-bold text-amber-500 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-amber-500" />
            <span>{t.stickyMobile}</span>
          </div>
          <div className="text-[10px] text-slate-400">{t.stickySub}</div>
        </div>
        <a
          href="#quiz-section"
          className="px-4 py-2.5 rounded-xl font-extrabold text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
        >
          {t.stickyBtn}
        </a>
      </div>
    </div>
  );
}
