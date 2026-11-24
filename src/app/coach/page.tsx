"use client";

import React, { useState } from "react";
import Link from "next/link";
import { COACH_STUDENTS_ROSTER, COACHES } from "@/lib/data";
import {
  ArrowLeft,
  Users,
  DollarSign,
  Calendar,
  MessageCircle,
  CheckCircle2,
  Clock,
  Send,
  X,
  FileText,
  TrendingUp,
  Award,
  Sparkles,
  Search,
} from "lucide-react";

export default function CoachPortalPage() {
  const coach = COACHES[0]; // Coach Marco Valenti
  const [students, setStudents] = useState(COACH_STUDENTS_ROSTER);
  const [activeTab, setActiveTab] = useState<"students" | "checkins" | "payouts">("students");

  // Modale Revisione Check-in
  const [reviewingStudent, setReviewingStudent] = useState<any | null>(null);
  const [coachFeedbackText, setCoachFeedbackText] = useState<string>("");
  const [feedbackSentSuccess, setFeedbackSentSuccess] = useState<boolean>(false);

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSentSuccess(true);
    setTimeout(() => {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === reviewingStudent.id ? { ...s, checkInStatus: "Completato" } : s
        )
      );
      setFeedbackSentSuccess(false);
      setReviewingStudent(null);
      setCoachFeedbackText("");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16 selection:bg-indigo-500 selection:text-white">
      {/* HEADER FORMATORE */}
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
                  FITPROTOCOL™ <span className="text-indigo-400">COACH PORTAL</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
                  STAFF TECNICO
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Pannello Operativo Formatore: <strong>{coach.name}</strong> ({coach.role})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/client"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              Vista Allievo
            </Link>
            <Link
              href="/admin"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              Vista Admin
            </Link>
          </div>
        </div>

        {/* TABS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 overflow-x-auto py-2 border-t border-slate-900 text-xs sm:text-sm font-bold">
          {[
            { id: "students", label: "I Miei Allievi Assegnati", icon: Users },
            { id: "checkins", label: "Check-in da Revisionare", icon: Calendar },
            { id: "payouts", label: "Compensi & Commissioni", icon: DollarSign },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
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
        {/* KPI DEL FORMATORE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs uppercase font-bold text-slate-400 mb-1">Allievi Assegnati</div>
            <div className="text-3xl font-black text-white">{coach.activeClients}</div>
            <div className="text-xs text-indigo-400 font-semibold mt-1">Capienza massima: 45 allievi</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs uppercase font-bold text-slate-400 mb-1">Check-in Domenicali</div>
            <div className="text-3xl font-black text-amber-400">
              {students.filter((s) => s.checkInStatus === "In Attesa di Revisione").length} in coda
            </div>
            <div className="text-xs text-slate-400 mt-1">Da inviare entro le 20:00</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs uppercase font-bold text-slate-400 mb-1">Compensi del Mese (35%)</div>
            <div className="text-3xl font-black text-emerald-400">3.430 €</div>
            <div className="text-xs text-emerald-400 mt-1">Su 9.800 € generati</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs uppercase font-bold text-slate-400 mb-1">Valutazione Media Allievi</div>
            <div className="text-3xl font-black text-white">4.96 / 5.0</div>
            <div className="text-xs text-slate-400 mt-1">142 recensioni verificate</div>
          </div>
        </div>

        {/* 1. TAB I MIEI ALLIEVI ASSEGNATI */}
        {activeTab === "students" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Roster Allievi Attivi ({students.length})</h3>
                <p className="text-xs text-slate-400">
                  Tutti gli allievi assegnati a te in base al matching con il tuo profilo metabolico.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/60">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-4">Allievo</th>
                    <th className="p-4">Programma</th>
                    <th className="p-4">Stato Percorso</th>
                    <th className="p-4">Ultimo Peso & Progresso</th>
                    <th className="p-4">Check-in Status</th>
                    <th className="p-4 text-right">Azioni Rapide</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-850 transition-colors">
                      <td className="p-4 font-bold text-white">
                        <div>{student.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{student.phone}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                          {student.program}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-slate-300 font-semibold">
                        Settimana {student.week} di 12
                      </td>
                      <td className="p-4 text-xs font-bold text-emerald-400">{student.lastWeight}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            student.checkInStatus === "In Attesa di Revisione"
                              ? "bg-amber-950 text-amber-400 border border-amber-800 animate-pulse"
                              : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          {student.checkInStatus}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setReviewingStudent(student)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-500 hover:bg-indigo-400 text-white transition-colors"
                          >
                            Revisiona
                          </button>
                          <a
                            href={`https://wa.me/${student.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400"
                            title="Apri WhatsApp Allievo"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. TAB CHECK-IN DA REVISIONARE */}
        {activeTab === "checkins" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl font-bold text-white">Check-in Domenicali da Completare</h3>
              <p className="text-xs text-slate-400">
                Rispondi con un feedback video o testuale per mantenere l&apos;aderenza dell&apos;allievo al 100%.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {students
                .filter((s) => s.checkInStatus === "In Attesa di Revisione")
                .map((student) => (
                  <div
                    key={student.id}
                    className="p-6 rounded-3xl bg-slate-900/80 border border-amber-500/40 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white text-base">{student.name}</div>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
                        Inviato oggi, 08:30
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Peso registrato:</span>
                        <span className="font-bold text-emerald-400">{student.lastWeight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Energia:</span>
                        <span className="font-bold text-white">8 / 10</span>
                      </div>
                      <div className="text-slate-400 pt-1 italic">
                        &ldquo;Ciao Marco! Ho aumentato di 2.5 kg la panca piana. Cene di lavoro gestite bene.&rdquo;
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setReviewingStudent(student)}
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-indigo-500 hover:bg-indigo-400 text-white transition-colors"
                    >
                      Invia Revisione & Feedback
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 3. TAB COMPENSI & COMMISSIONI */}
        {activeTab === "payouts" && (
          <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <span>Riepilogo Payout Mensile</span>
              </h3>
              <p className="text-xs text-slate-400">
                La direzione salda le commissioni dei formatori ogni 5 del mese tramite bonifico SEPA.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-white">Commissione Percorsi ELITE 90D (11 vendite)</div>
                    <div className="text-slate-500">35% di 690€ cad.</div>
                  </div>
                  <div className="font-extrabold text-emerald-400 text-sm">2.656,50 €</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-white">Commissione Percorsi VIP 180D (2 vendite)</div>
                    <div className="text-slate-500">35% di 1.190€ cad.</div>
                  </div>
                  <div className="font-extrabold text-emerald-400 text-sm">833,00 €</div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex justify-between items-center text-sm font-bold">
                  <span className="text-emerald-300">Totale Maturato questo Mese:</span>
                  <span className="text-emerald-300 text-base font-black">3.489,50 €</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODALE REVISIONE CHECK-IN */}
      {reviewingStudent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 animate-scaleIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-base">
                Revisione Check-in: {reviewingStudent.name}
              </h4>
              <button
                type="button"
                onClick={() => setReviewingStudent(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {feedbackSentSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="text-sm font-bold text-white">Feedback Inviato con Successo!</div>
                <div className="text-xs text-slate-400">L&apos;allievo riceverà l&apos;aggiornamento istantaneamente.</div>
              </div>
            ) : (
              <form onSubmit={handleSendFeedback} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">
                    Messaggio di Feedback & Modifiche Routine
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={coachFeedbackText}
                    onChange={(e) => setCoachFeedbackText(e.target.value)}
                    placeholder="Es: Ottimo lavoro Francesco! Il peso scende con regolarità. Per la prossima settimana alziamo di 2kg lo squat e manteniamo le calorie attuali a 2.150 kcal..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase text-slate-400 mb-1">
                      Target Calorico Prossima Settimana
                    </label>
                    <input
                      type="text"
                      defaultValue="2.150 kcal"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-slate-400 mb-1">
                      Stato Approvazione
                    </label>
                    <select className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white">
                      <option>Approvato con Congratulazioni</option>
                      <option>Modifiche Necessarie</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold bg-indigo-500 hover:bg-indigo-400 text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Invia Feedback all&apos;Allievo</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
