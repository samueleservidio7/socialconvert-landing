"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CLIENT_SESSION_DATA } from "@/lib/data";
import {
  ArrowLeft,
  Activity,
  Calendar,
  Scale,
  MessageCircle,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  Video,
  FileText,
  TrendingDown,
  X,
  Send,
  User,
  Sparkles,
} from "lucide-react";

export default function ClientPortalPage() {
  const [activeTab, setActiveTab] = useState<"workout" | "nutrition" | "checkin" | "history">("workout");
  const [activeWorkoutDay, setActiveWorkoutDay] = useState<number>(0);

  // Modal Video Esecuzione Esercizio
  const [selectedExercise, setSelectedExercise] = useState<{
    name: string;
    sets: string;
    reps: string;
    load: string;
    rest: string;
  } | null>(null);

  // Cronometro / Rest Timer Interattivo
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const resetTimer = (seconds: number) => {
    setIsTimerRunning(false);
    setTimerSeconds(seconds);
  };

  // Form Check-in Domenicale
  const [checkinForm, setCheckinForm] = useState({
    weight: "",
    waist: "",
    energy: "8",
    notes: "",
  });
  const [isCheckinSubmitted, setIsCheckinSubmitted] = useState<boolean>(false);

  const handleCheckinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckinSubmitted(true);
  };

  const client = CLIENT_SESSION_DATA;
  const currentSplit = client.workoutSplit[activeWorkoutDay];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16 selection:bg-amber-500 selection:text-black">
      {/* HEADER CLIENTE */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/90 border-b border-slate-800">
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
                  FIT<span className="text-amber-400">PROTOCOL</span>™
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {client.program}
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Area Riservata Allievo: <strong>{client.name}</strong> ({client.profession})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`https://wa.me/${client.coach.phone}?text=Ciao%20Coach%20Marco,%20ti%20scrivo%20dall'Area%20Clienti%20FitProtocol!`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span className="hidden sm:inline">Scrivi al Coach</span>
            </a>

            <Link
              href="/login"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              Cambia Ruolo
            </Link>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 overflow-x-auto py-2 border-t border-slate-900 text-xs sm:text-sm font-bold">
          {[
            { id: "workout", label: "Scheda di Allenamento", icon: Activity },
            { id: "nutrition", label: "Piano Nutrizionale & Macro", icon: Scale },
            { id: "checkin", label: "Invia Check-in Domenicale", icon: Calendar },
            { id: "history", label: "Storico Feedback Coach", icon: Award },
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
        {/* BANNER AVANZAMENTO PERCORSO */}
        <div className="mb-8 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 font-black text-slate-950 flex items-center justify-center text-xl shrink-0">
              {client.coach.avatar}
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Coach Assegnato
              </div>
              <div className="text-lg font-black text-white">{client.coach.name}</div>
              <div className="text-xs text-slate-400">{client.coach.role}</div>
            </div>
          </div>

          <div className="w-full md:w-auto flex-1 max-w-md">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-slate-300">Avanzamento Programma</span>
              <span className="text-amber-400">
                Settimana {client.currentWeek} di {client.totalWeeks} (50%)
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full w-[50%]" />
            </div>
          </div>

          <div className="flex gap-4 text-xs font-semibold">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-slate-400">Partenza</div>
              <div className="font-bold text-white mt-0.5">{client.stats.startWeight}</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center">
              <div className="text-emerald-400">Attuale</div>
              <div className="font-extrabold text-emerald-300 mt-0.5">
                {client.stats.currentWeight} ({client.stats.weightLost})
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-slate-400">Obiettivo</div>
              <div className="font-bold text-amber-400 mt-0.5">{client.stats.targetWeight}</div>
            </div>
          </div>
        </div>

        {/* 1. TAB ALLENAMENTO (WORKOUT) */}
        {activeTab === "workout" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Selettore Sessione Giorno */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                {client.workoutSplit.map((split, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveWorkoutDay(idx)}
                    className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                      activeWorkoutDay === idx
                        ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                        : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {split.day}
                  </button>
                ))}
              </div>

              {/* CRONOMETRO DI RECUPERO INTERATTIVO */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-slate-300">Timer Recupero:</span>
                <span className="font-mono text-base font-black text-amber-400">
                  {String(Math.floor(timerSeconds / 60)).padStart(2, "0")}:
                  {String(timerSeconds % 60).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
                  title={isTimerRunning ? "Pausa" : "Avvia"}
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5 fill-slate-950" /> : <Play className="w-3.5 h-3.5 fill-slate-950" />}
                </button>
                <button
                  type="button"
                  onClick={() => resetTimer(60)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Resetta 60s"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* TABELLA ESERCIZI DELLA SESSIONE ATTIVA */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{currentSplit.title}</h3>
                  <p className="text-xs text-slate-400">
                    Durata stimata: <strong>{currentSplit.duration}</strong> • 3-4 minuti di riscaldamento articolare prima di iniziare.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-950 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-4">Esercizio</th>
                      <th className="p-4">Serie x Ripetizioni</th>
                      <th className="p-4">Carico Consigliato</th>
                      <th className="p-4">Recupero</th>
                      <th className="p-4 text-right">Video Guida</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {currentSplit.exercises.map((ex, idx) => (
                      <tr key={idx} className="hover:bg-slate-850 transition-colors">
                        <td className="p-4 font-bold text-white flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 text-xs font-black flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span>{ex.name}</span>
                        </td>
                        <td className="p-4 font-mono font-semibold text-slate-300">
                          {ex.sets} × {ex.reps}
                        </td>
                        <td className="p-4 text-xs font-bold text-amber-400">{ex.load}</td>
                        <td className="p-4 text-xs text-slate-400">{ex.rest}</td>
                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedExercise(ex)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 transition-colors"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Vedi Esecuzione 4K</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. TAB NUTRIZIONE (NUTRITION) */}
        {activeTab === "nutrition" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl font-bold text-white">Piano Nutrizionale Personalizzato</h3>
              <p className="text-xs text-slate-400">
                Calcolato da Coach Marco per garantire un deficit calorico moderato senza perdita di massa muscolare.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs uppercase font-bold text-slate-400 mb-1">Target Calorico Giornaliero</div>
                <div className="text-3xl font-black text-amber-400">{client.nutrition.dailyCalories} kcal</div>
                <div className="text-xs text-slate-400 mt-1">Deficit di -450 kcal sostenibile</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs uppercase font-bold text-slate-400 mb-1">Proteine</div>
                <div className="text-3xl font-black text-indigo-400">{client.nutrition.proteinGrams} g</div>
                <div className="text-xs text-slate-400 mt-1">2.0g per kg di peso corporeo</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs uppercase font-bold text-slate-400 mb-1">Carboidrati</div>
                <div className="text-3xl font-black text-emerald-400">{client.nutrition.carbsGrams} g</div>
                <div className="text-xs text-slate-400 mt-1">Energia per gli allenamenti</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs uppercase font-bold text-slate-400 mb-1">Grassi Buoni</div>
                <div className="text-3xl font-black text-orange-400">{client.nutrition.fatGrams} g</div>
                <div className="text-xs text-slate-400 mt-1">Supporto ormonale e articolare</div>
              </div>
            </div>

            {/* Note del Coach & Guida Cene Fuori */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h4 className="font-bold text-base text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Strategia Cene Aziendali & Ristoranti (Nota del Coach)</span>
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800 italic">
                &ldquo;{client.nutrition.notes}&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* 3. TAB INVIA CHECK-IN DOMENICALE */}
        {activeTab === "checkin" && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-2xl font-black text-white">Invia il Check-in della Domenica</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Carica il tuo peso a digiuno e le misure. Coach Marco analizzerà le risposte e ti invierà la video-risposta entro domenica sera.
              </p>
            </div>

            {isCheckinSubmitted ? (
              <div className="p-8 rounded-3xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-white">Check-in Inviato con Successo!</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Grazie Francesco! I tuoi dati sono stati registrati nella dashboard di Coach Marco. Riceverai la revisione settimanale su WhatsApp a breve.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCheckinSubmitted(false)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-700"
                >
                  Invia un altro aggiornamento
                </button>
              </div>
            ) : (
              <form onSubmit={handleCheckinSubmit} className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Peso di Oggi a Digiuno (kg) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      placeholder="es. 81.2"
                      value={checkinForm.weight}
                      onChange={(e) => setCheckinForm({ ...checkinForm, weight: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Giro Vita all&apos;Ombelico (cm) *
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      placeholder="es. 86.5"
                      value={checkinForm.waist}
                      onChange={(e) => setCheckinForm({ ...checkinForm, waist: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Livello di Energia e Aderenza (da 1 a 10)
                  </label>
                  <select
                    value={checkinForm.energy}
                    onChange={(e) => setCheckinForm({ ...checkinForm, energy: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    {[10, 9, 8, 7, 6, 5, 4].map((v) => (
                      <option key={v} value={v}>
                        {v} / 10 {v >= 8 ? "(Ottima energia)" : "(Media)"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Note sulla settimana (Cene fuori, carichi in aumento, dubbi)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Come sono andati gli allenamenti? Hai avuto difficoltà con la dieta?"
                    value={checkinForm.notes}
                    onChange={(e) => setCheckinForm({ ...checkinForm, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Invia Check-in a Coach Marco</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* 4. TAB STORICO FEEDBACK COACH */}
        {activeTab === "history" && (
          <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold text-white">Storico Revisioni & Feedback Settimanali</h3>
              <p className="text-xs text-slate-400">
                Tutte le indicazioni e i progressi registrati da Coach Marco nelle settimane precedenti.
              </p>
            </div>

            <div className="space-y-4">
              {client.checkInHistory.map((item, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                      {item.week}
                    </span>
                    <span className="text-xs text-slate-500">{item.date}</span>
                  </div>
                  <div className="flex gap-4 text-xs font-semibold text-slate-300">
                    <span>Peso registrato: <strong>{item.weight}</strong></span>
                    <span>•</span>
                    <span>Giro vita: <strong>{item.waist}</strong></span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 text-xs text-slate-300 border border-slate-800/80 leading-relaxed italic">
                    &ldquo;{item.coachFeedback}&rdquo;
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODALE VIDEO ESECUZIONE ESERCIZIO */}
      {selectedExercise && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 animate-scaleIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <Video className="w-5 h-5 text-amber-400" />
                <span>{selectedExercise.name}</span>
              </h4>
              <button
                type="button"
                onClick={() => setSelectedExercise(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulatore Player Video 4K */}
            <div className="w-full h-52 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden group">
              <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/30 group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-6 h-6 fill-slate-950 ml-1" />
              </div>
              <span className="text-xs text-slate-400 mt-3 font-semibold">
                Video Dimostrativo 4K Ultra-HD con Audio Cues
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-300">Punti Chiave di Esecuzione:</div>
              <ul className="space-y-1 text-slate-400 list-disc list-inside">
                <li>Mantieni le scapole addotte e depresse durante l&apos;intero movimento.</li>
                <li>Fase eccentrica controllata in 2-3 secondi per massimizzare la tensione.</li>
                <li>Non bloccare i gomiti a fine estensione per preservare l&apos;articolazione.</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setSelectedExercise(null)}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white"
            >
              Chiudi Guida
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
