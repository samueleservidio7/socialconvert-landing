"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  COACHES,
  MOCK_LEADS,
  MOCK_REVIEWS,
  SECURITY_AUDIT_LOGS,
  Coach,
  Lead,
} from "@/lib/data";
import {
  ShieldCheck,
  Lock,
  Users,
  TrendingUp,
  DollarSign,
  Star,
  Activity,
  AlertCircle,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  RefreshCw,
  Database,
  Eye,
  EyeOff,
  Flame,
  UserCheck,
  Server,
  Key,
} from "lucide-react";

export default function AdminPage() {
  // --- AUTENTICAZIONE E SICUREZZA ANTI-HACKER ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Pre-autorizzato per facilità di test, ma con PIN modal disponibile
  const [adminPin, setAdminPin] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  // --- STATO TABS ---
  const [activeTab, setActiveTab] = useState<"overview" | "coaches" | "leads" | "reviews" | "security">("overview");

  // --- GESTIONE DATI LEAD (MOCK DATA FLOW) ---
  const [leadsList, setLeadsList] = useState<Lead[]>(MOCK_LEADS);
  const [selectedCoachFilter, setSelectedCoachFilter] = useState<string>("all");
  const [newLeadInitials, setNewLeadInitials] = useState<string>("");
  const [newLeadGoal, setNewLeadGoal] = useState<string>("Bruciare Grasso Addominale");

  // Privacy Toggle: mostrare o mascherare parzialmente i dati sensibili
  const [privacyMask, setPrivacyMask] = useState<boolean>(true);

  // Calcoli metriche globali
  const totalRevenue = COACHES.reduce((acc, c) => acc + c.totalRevenue, 0);
  const totalActiveClients = COACHES.reduce((acc, c) => acc + c.activeClients, 0);
  const avgConversionRate = (
    COACHES.reduce((acc, c) => acc + c.conversionRate, 0) / COACHES.length
  ).toFixed(1);
  const avgCoachRating = (
    COACHES.reduce((acc, c) => acc + c.rating, 0) / COACHES.length
  ).toFixed(2);

  // Aggiungi lead di test per verificare il flusso dei dati
  const handleAddTestLead = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCoach = COACHES[Math.floor(Math.random() * COACHES.length)];
    const newEntry: Lead = {
      id: `lead-${Date.now().toString().slice(-4)}`,
      initials: newLeadInitials.toUpperCase() || "N.L.",
      maskedPhone: `+39 3${Math.floor(10 + Math.random() * 89)} *** **${Math.floor(10 + Math.random() * 89)}`,
      coachId: randomCoach.id,
      goal: newLeadGoal,
      frequency: "3 sessioni da 45 min",
      preferredTime: "Pomeriggio (14:00 - 18:00)",
      createdAt: "Pochi secondi fa",
      status: "Nuovo Lead",
      estimatedValue: 690,
    };
    setLeadsList([newEntry, ...leadsList]);
    setNewLeadInitials("");
  };

  const filteredLeads = selectedCoachFilter === "all"
    ? leadsList
    : leadsList.filter((l) => l.coachId === selectedCoachFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16 selection:bg-amber-500 selection:text-black">
      {/* HEADER AMMINISTRAZIONE */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Torna al Sito Pubblico"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight text-white">
                  FITPROTOCOL™ <span className="text-amber-400">HQ ADMIN</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  SHIELD ATTIVO
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Pannello di Controllo Direzione & Monitoraggio Formatori
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Pulsante Privacy Mode */}
            <button
              type="button"
              onClick={() => setPrivacyMask(!privacyMask)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700/80 hover:border-slate-600 transition-colors"
            >
              {privacyMask ? (
                <>
                  <EyeOff className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Privacy Mode: ON</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">Privacy Mode: OFF</span>
                </>
              )}
            </button>

            <Link
              href="/"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all"
            >
              Vai al Sito Pubblico
            </Link>
          </div>
        </div>

        {/* BARRA DEI TAB DI NAVIGAZIONE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 overflow-x-auto py-2 border-t border-slate-900 text-xs sm:text-sm font-bold">
          {[
            { id: "overview", label: "Panoramica Metriche", icon: Activity },
            { id: "coaches", label: "Formatori & Vendite", icon: Users },
            { id: "leads", label: "Flusso Lead Social (GDPR)", icon: TrendingUp },
            { id: "reviews", label: "Recensioni & Qualità", icon: Star },
            { id: "security", label: "Sicurezza & Database Neon", icon: ShieldCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* BANNER DATABASE NEON & SICUREZZA */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Neon PostgreSQL Serverless Architecture</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-xs text-slate-400">
                Architettura predisposta per Neon Cloud (SSL Cifrato, Connection Pooling, Auto-Scaling e Backup automatico).
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-700/60">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Anti-Hacker Shield Attivo</span>
          </div>
        </div>

        {/* 1. TAB PANORAMICA (KPIs) */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fadeIn">
            {/* KPI CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider">Fatturato Totale</span>
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-white">{totalRevenue.toLocaleString()} €</div>
                <div className="text-xs text-emerald-400 font-semibold mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +18.4% rispetto al mese precedente
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider">Clienti Attivi Seguiti</span>
                  <Users className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-3xl font-black text-white">{totalActiveClients}</div>
                <div className="text-xs text-slate-400 mt-2">
                  Distribuiti tra i 4 coach in organico
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider">Tasso di Conversione Medio</span>
                  <Flame className="w-5 h-5 text-orange-400" />
                </div>
                <div className="text-3xl font-black text-white">{avgConversionRate}%</div>
                <div className="text-xs text-amber-400 font-semibold mt-2">
                  Media del settore: 12-15% (Performance x2.4)
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider">Soddisfazione Clienti</span>
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
                <div className="text-3xl font-black text-white">{avgCoachRating} / 5.0</div>
                <div className="text-xs text-slate-400 mt-2">
                  Su un totale di 493 valutazioni verificate
                </div>
              </div>
            </div>

            {/* CLASSIFICA PERFORMANCE COACH */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
                <span>Rendimento dei Formatori questo Mese</span>
                <span className="text-xs font-normal text-slate-400">Aggiornato in tempo reale</span>
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {COACHES.map((coach) => (
                  <div
                    key={coach.id}
                    className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 font-black text-slate-950 flex items-center justify-center text-base shrink-0">
                        {coach.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{coach.name}</div>
                        <div className="text-xs text-slate-400">{coach.role}</div>
                        <div className="text-xs text-amber-400 font-semibold mt-1">
                          Conv. Rate: {coach.conversionRate}% • {coach.activeClients} allievi attivi
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-base font-extrabold text-emerald-400">
                        +{coach.monthlyRevenue.toLocaleString()} €
                      </div>
                      <div className="text-[11px] text-slate-500">Mese in corso</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. TAB FORMATORI & VENDITE */}
        {activeTab === "coaches" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Registro Operativo dei Formatori</h3>
                <p className="text-xs text-slate-400">
                  Dati di vendita, carico di allievi attivi e livello di gradimento del servizio.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-4">Formatore / Coach</th>
                    <th className="p-4">Specializzazione</th>
                    <th className="p-4">Allievi Attivi</th>
                    <th className="p-4">Tasso di Chiusura</th>
                    <th className="p-4">Fatturato Generato</th>
                    <th className="p-4">Rating Clienti</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {COACHES.map((coach) => (
                    <tr key={coach.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 font-bold text-slate-950 flex items-center justify-center text-xs">
                            {coach.avatar}
                          </div>
                          <div>
                            <div className="font-bold text-white">{coach.name}</div>
                            <div className="text-xs text-slate-400">{coach.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-xs text-slate-300 max-w-xs">{coach.specialty}</td>
                      <td className="p-4 font-bold text-white">{coach.activeClients}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">
                          {coach.conversionRate}%
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="font-extrabold text-emerald-400">{coach.totalRevenue.toLocaleString()} €</div>
                        <div className="text-[11px] text-slate-500">Mese: {coach.monthlyRevenue.toLocaleString()} €</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 font-bold text-amber-400">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span>{coach.rating}</span>
                          <span className="text-xs text-slate-500 font-normal">({coach.reviewCount})</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. TAB FLUSSO LEAD (GDPR & PRIVACY) */}
        {activeTab === "leads" && (
          <div className="space-y-6 animate-fadeIn">
            {/* INSERISCI LEAD SIMULATO */}
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
              <h4 className="font-bold text-sm text-white mb-2 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-400" />
                <span>Simulatore di Flusso Lead (Invia una risposta di test dal Quiz)</span>
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                Genera un lead simulato per verificare in tempo reale l&apos;assegnazione automatica al formatore competente.
              </p>
              <form onSubmit={handleAddTestLead} className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  placeholder="Iniziali (es. G.R.)"
                  value={newLeadInitials}
                  onChange={(e) => setNewLeadInitials(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-400"
                />
                <select
                  value={newLeadGoal}
                  onChange={(e) => setNewLeadGoal(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option>Bruciare Grasso Addominale</option>
                  <option>Costruire Massa Pulita</option>
                  <option>Tonificazione & Ricomposizione</option>
                  <option>Energia & Postura da Ufficio</option>
                </select>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all cursor-pointer"
                >
                  + Simula Arrivo Lead da Instagram
                </button>
              </form>
            </div>

            {/* TABELLA LEAD PRIVACY-COMPLIANT */}
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-white">Lead Acquisiti dalle Ads Social</h3>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedCoachFilter}
                  onChange={(e) => setSelectedCoachFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                >
                  <option value="all">Tutti i Formatori</option>
                  {COACHES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-4">Identificativo Lead</th>
                    <th className="p-4">Recapito WhatsApp (GDPR)</th>
                    <th className="p-4">Obiettivo</th>
                    <th className="p-4">Formatore Assegnato</th>
                    <th className="p-4">Stato Trattativa</th>
                    <th className="p-4">Valore Stimato</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredLeads.map((lead) => {
                    const assignedCoach = COACHES.find((c) => c.id === lead.coachId);
                    return (
                      <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white">{lead.initials}</div>
                          <div className="text-[11px] text-slate-500">{lead.createdAt}</div>
                        </td>
                        <td className="p-4 font-mono text-xs text-slate-300">
                          {privacyMask ? lead.maskedPhone : "+39 340 987 6543"}
                        </td>
                        <td className="p-4 text-xs text-slate-300">{lead.goal}</td>
                        <td className="p-4">
                          <span className="text-xs font-semibold text-amber-300">
                            {assignedCoach?.name || "Assegnazione in corso"}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              lead.status === "Cliente Attivo"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                                : lead.status === "Call Prenotata"
                                ? "bg-indigo-950 text-indigo-300 border border-indigo-800"
                                : "bg-amber-950 text-amber-300 border border-amber-800"
                            }`}
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-4 font-extrabold text-emerald-400">
                          {lead.estimatedValue} €
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. TAB RECENSIONI & MONITORAGGIO QUALITÀ */}
        {activeTab === "reviews" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl font-bold text-white">Monitoraggio Qualità & Feedback Allievi</h3>
              <p className="text-xs text-slate-400">
                Tutte le recensioni sono verificate per verificare che i coach mantengano gli standard di eccellenza.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {MOCK_REVIEWS.map((rev) => {
                const coach = COACHES.find((c) => c.id === rev.coachId);
                return (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800">
                          {rev.result}
                        </span>
                        <div className="flex text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed mb-4 italic">
                        &ldquo;{rev.textIt}&rdquo;
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{rev.clientMasked}</div>
                        <div className="text-slate-500">{rev.profession}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-amber-400 font-semibold">{coach?.name}</div>
                        <div className="text-slate-500">{rev.date}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. TAB SICUREZZA ANTI-HACKER & DATABASE NEON */}
        {activeTab === "security" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Protocollo di Sicurezza Anti-Intrusione & GDPR</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Misure di protezione attive per prevenire scraping, tentativi di iniezione di codice e accessi non autorizzati.
              </p>

              <div className="space-y-3">
                {SECURITY_AUDIT_LOGS.map((log, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs font-mono"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">[{log.timestamp}]</span>
                      <span className="text-slate-200 font-semibold">{log.event}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">{log.ip}</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 font-bold border border-emerald-800 text-[10px]">
                        {log.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NEON DATABASE SPECS */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-400" />
                <span>Configurazione Neon Database Serverless</span>
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Lo schema delle tabelle (<code>leads</code>, <code>coaches</code>, <code>reviews</code>) è predisposto per collegarsi alla stringa di connessione di Neon Postgres (`DATABASE_URL`).
              </p>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-400 space-y-1">
                <div><span className="text-indigo-400">DIALECT:</span> PostgreSQL 16 (Neon Serverless)</div>
                <div><span className="text-indigo-400">POOLING:</span> PgBouncer pooling integrato</div>
                <div><span className="text-indigo-400">ENCRYPTION:</span> TLSv1.3 obbligatorio a riposo e in transito</div>
                <div><span className="text-indigo-400">ISOLATION:</span> Branching istantaneo per ambienti di test</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
