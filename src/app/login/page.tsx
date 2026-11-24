"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  User,
  Users,
  Shield,
  ArrowRight,
  ArrowLeft,
  Lock,
  Mail,
  Sparkles,
  KeyRound,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"client" | "coach" | "admin">("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === "client") router.push("/client");
    else if (selectedRole === "coach") router.push("/coach");
    else router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* HEADER */}
      <header className="max-w-7xl w-full mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Torna alla Homepage</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-black text-slate-950 text-xs shadow-lg shadow-amber-500/25">
            FP
          </div>
          <span className="font-extrabold text-base tracking-tight text-white">
            FIT<span className="text-amber-400">PROTOCOL</span>™
          </span>
        </div>
      </header>

      {/* CONTENITORE CENTRALE */}
      <main className="max-w-4xl w-full mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portale Unificato ad Accesso Protetto</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Seleziona la tua Area di Accesso
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Ogni profilo dispone di una dashboard specifica per il proprio ruolo. Scegli chi sei o usa l&apos;accesso rapido demo in un click.
          </p>
        </div>

        {/* 3 SCHEDE DI ACCESSO RAPIDO DEMO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
          {/* 1. CLIENTE */}
          <div
            onClick={() => setSelectedRole("client")}
            className={`p-6 rounded-3xl border text-left cursor-pointer transition-all relative overflow-hidden group ${
              selectedRole === "client"
                ? "bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/10 scale-[1.02]"
                : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80"
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <User className="w-6 h-6" />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1">
              Per Chi ha Acquistato
            </div>
            <h3 className="text-lg font-black text-white mb-2">Area Privata Cliente</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Visualizza la tua scheda di allenamento con video 4K, il calcolo dei macronutrienti e invia il check-in settimanale.
            </p>
            <Link
              href="/client"
              className="inline-flex items-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 justify-center shadow-lg shadow-amber-500/20 transition-all"
            >
              <span>Entra come Cliente (Francesco L.)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2. FORMATORE / COACH */}
          <div
            onClick={() => setSelectedRole("coach")}
            className={`p-6 rounded-3xl border text-left cursor-pointer transition-all relative overflow-hidden group ${
              selectedRole === "coach"
                ? "bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/10 scale-[1.02]"
                : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80"
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-1">
              Per i Formatori dello Staff
            </div>
            <h3 className="text-lg font-black text-white mb-2">Portale Formatore Coach</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Gestisci il tuo roster allievi assegnati, revisiona i check-in domenicali e monitora le tue commissioni maturate.
            </p>
            <Link
              href="/coach"
              className="inline-flex items-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-500 text-white hover:bg-indigo-400 justify-center shadow-lg shadow-indigo-500/20 transition-all"
            >
              <span>Entra come Coach (Marco V.)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3. DIREZIONE / ADMIN */}
          <div
            onClick={() => setSelectedRole("admin")}
            className={`p-6 rounded-3xl border text-left cursor-pointer transition-all relative overflow-hidden group ${
              selectedRole === "admin"
                ? "bg-slate-900 border-emerald-500 shadow-xl shadow-emerald-500/10 scale-[1.02]"
                : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80"
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
              Proprietario & Direzione
            </div>
            <h3 className="text-lg font-black text-white mb-2">Super Admin HQ</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Panoramica finanziaria, flusso lead da social, grafici di fatturato, privacy GDPR e gestione Database Neon.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 justify-center shadow-lg shadow-emerald-500/20 transition-all"
            >
              <span>Entra come Admin HQ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* FORM DI LOGIN CLASSICO MANUALE */}
        <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
          <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Accesso Tradizionale con Credenziali</span>
          </h4>
          <p className="text-xs text-slate-400 mb-5">
            Hai già una password personale? Inserisci email e password per accedere.
          </p>

          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Email Utente
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="utente@fitprotocol.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400 transition-colors"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-amber-500/20"
            >
              Accedi all&apos;Area Riservata
            </button>
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        FITPROTOCOL™ Multi-Role Enterprise Architecture • Conforme alle normative GDPR
      </footer>
    </div>
  );
}
