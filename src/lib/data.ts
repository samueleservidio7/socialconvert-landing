export interface Coach {
  id: string;
  name: string;
  role: string;
  specialty: string;
  specialtyEn: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  activeClients: number;
  conversionRate: number; // e.g. 34%
  totalRevenue: number;
  monthlyRevenue: number;
  bioIt: string;
  bioEn: string;
  matchGoals: string[];
  phone: string;
}

export const COACHES: Coach[] = [
  {
    id: "coach-marco",
    name: "Marco 'Metabolic' Valenti",
    role: "Head Coach Ricomposizione & Grasso Ostinato",
    specialty: "Deficit calorico sostenibile per professionisti con poco tempo",
    specialtyEn: "Sustainable caloric deficit for busy professionals",
    avatar: "MV",
    rating: 4.96,
    reviewCount: 142,
    activeClients: 38,
    conversionRate: 34.2,
    totalRevenue: 54600,
    monthlyRevenue: 9800,
    bioIt: "Ex atleta agonista con oltre 8 anni di esperienza nella ricomposizione corporea per avvocati, manager e imprenditori con agende fitte.",
    bioEn: "Former competitive athlete with 8+ years specializing in metabolic recomposition for busy lawyers, executives and founders.",
    matchGoals: ["fat_loss", "recomp"],
    phone: "39333100001",
  },
  {
    id: "coach-davide",
    name: "Davide 'Iron' Moretti",
    role: "Senior Coach Ipertrofia & Massa Pulita",
    specialty: "Sviluppo muscolare mirato e progressione carichi in 3 sessioni",
    specialtyEn: "Targeted hypertrophy & progressive overload in 3 sessions",
    avatar: "DM",
    rating: 4.92,
    reviewCount: 98,
    activeClients: 29,
    conversionRate: 31.8,
    totalRevenue: 41200,
    monthlyRevenue: 7400,
    bioIt: "Specialista in biomeccanica applicata ed efficienza neuromuscolare. Ottimizza ogni ripetizione per massimizzare la crescita riducendo il tempo in palestra.",
    bioEn: "Applied biomechanics specialist. Maximizes muscular development per workout while keeping sessions under 45 minutes.",
    matchGoals: ["hypertrophy"],
    phone: "39333100002",
  },
  {
    id: "coach-elena",
    name: "Elena 'FitLife' Rostagno",
    role: "Master Coach Benessere & Tonificazione Femminile",
    specialty: "Ottimizzazione ormonale, ritenzione idrica e salute metabolica",
    specialtyEn: "Hormonal optimization, water retention and metabolic health",
    avatar: "ER",
    rating: 4.98,
    reviewCount: 165,
    activeClients: 44,
    conversionRate: 37.5,
    totalRevenue: 62800,
    monthlyRevenue: 11200,
    bioIt: "Chinesiologa e nutrizionista sportiva. Ha aiutato centinaia di donne e professioniste a rimodellare gambe, glutei e addome senza diete estreme.",
    bioEn: "Kinesiologist & certified sports nutritionist. Helped hundreds of women tone glutes and core sustainably without extreme starvation diets.",
    matchGoals: ["female_toning", "recomp"],
    phone: "39333100003",
  },
  {
    id: "coach-luca",
    name: "Dott. Luca Barbieri",
    role: "Specialista Postura, Longevità & Anti-Stress",
    specialty: "Eliminazione dolori posturali da scrivania e recupero energetico",
    specialtyEn: "Desk posture correction, back pain relief & energy restoration",
    avatar: "LB",
    rating: 4.94,
    reviewCount: 88,
    activeClients: 26,
    conversionRate: 29.4,
    totalRevenue: 35900,
    monthlyRevenue: 6300,
    bioIt: "Fisioterapista ed esperto di longevità funzionale. Perfetto per chi soffre di mal di schiena da ufficio e vuole sentirsi energico e forte.",
    bioEn: "Physical therapist and functional longevity coach. Dedicated to desk workers suffering from back tightness seeking pain-free vitality.",
    matchGoals: ["posture_energy"],
    phone: "39333100004",
  },
];

export interface Lead {
  id: string;
  initials: string;
  maskedPhone: string;
  coachId: string;
  goal: string;
  frequency: string;
  preferredTime: string;
  createdAt: string;
  status: "Nuovo Lead" | "Call Prenotata" | "Cliente Attivo" | "Non Risponde";
  estimatedValue: number;
}

export const MOCK_LEADS: Lead[] = [
  {
    id: "lead-101",
    initials: "M.R.",
    maskedPhone: "+39 340 *** **45",
    coachId: "coach-marco",
    goal: "Bruciare Grasso Addominale",
    frequency: "3 volte da 45 min",
    preferredTime: "Pomeriggio (14:00 - 18:00)",
    createdAt: "Oggi, 12:42",
    status: "Call Prenotata",
    estimatedValue: 590,
  },
  {
    id: "lead-102",
    initials: "A.V.",
    maskedPhone: "+39 349 *** **12",
    coachId: "coach-davide",
    goal: "Costruire Massa Pulita",
    frequency: "3 sessioni",
    preferredTime: "Sera (18:30 - 20:30)",
    createdAt: "Oggi, 11:15",
    status: "Cliente Attivo",
    estimatedValue: 890,
  },
  {
    id: "lead-103",
    initials: "G.B.",
    maskedPhone: "+39 328 *** **89",
    coachId: "coach-elena",
    goal: "Tonificazione & Ricomposizione",
    frequency: "3 volte da 45 min",
    preferredTime: "Mattina (09:00 - 13:00)",
    createdAt: "Oggi, 09:20",
    status: "Nuovo Lead",
    estimatedValue: 690,
  },
  {
    id: "lead-104",
    initials: "F.T.",
    maskedPhone: "+39 335 *** **67",
    coachId: "coach-luca",
    goal: "Energia & Postura da Ufficio",
    frequency: "2 sessioni",
    preferredTime: "Pomeriggio (14:00 - 18:00)",
    createdAt: "Ieri, 18:35",
    status: "Call Prenotata",
    estimatedValue: 490,
  },
  {
    id: "lead-105",
    initials: "S.C.",
    maskedPhone: "+39 347 *** **90",
    coachId: "coach-marco",
    goal: "Bruciare Grasso Addominale",
    frequency: "3 volte da 45 min",
    preferredTime: "Sera (18:30 - 20:30)",
    createdAt: "Ieri, 15:10",
    status: "Cliente Attivo",
    estimatedValue: 890,
  },
  {
    id: "lead-106",
    initials: "L.P.",
    maskedPhone: "+39 333 *** **23",
    coachId: "coach-elena",
    goal: "Ricomposizione Corporea",
    frequency: "3 volte",
    preferredTime: "Mattina (09:00 - 13:00)",
    createdAt: "Ieri, 11:05",
    status: "Cliente Attivo",
    estimatedValue: 690,
  },
];

export interface Review {
  id: string;
  coachId: string;
  clientMasked: string;
  profession: string;
  rating: number;
  result: string;
  textIt: string;
  textEn: string;
  date: string;
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-1",
    coachId: "coach-marco",
    clientMasked: "Francesco L.",
    profession: "Avvocato & Padre di 2 figli",
    rating: 5,
    result: "-9.4 KG IN 12 SETTIMANE",
    textIt: "Lavoro 10 ore al giorno in studio legale. Coach Marco ha strutturato il deficit calorico senza togliere il pranzo di lavoro. Ho perso quasi 10 kg di grasso addominale in 3 mesi.",
    textEn: "Working 10 hours a day in a law firm, Coach Marco engineered my fat loss around business lunches. Dropped 9.4 kg of belly fat in 12 weeks.",
    date: "3 giorni fa",
  },
  {
    id: "rev-2",
    coachId: "coach-davide",
    clientMasked: "Matteo D.",
    profession: "Software Engineer & Founder",
    rating: 5,
    result: "+4.8 KG MASSA PULITA",
    textIt: "Con Davide ho imparato la vera intensità. In 45 minuti spingo il doppio di quanto facevo in 2 ore perse a chiacchierare in palestra. Petto e braccia cambiati totalmente.",
    textEn: "With Davide I learned true training intensity. 45-minute focused workouts beat 2 hours of aimless gym routines. Noticeable chest and arm growth.",
    date: "1 settimana fa",
  },
  {
    id: "rev-3",
    coachId: "coach-elena",
    clientMasked: "Chiara B.",
    profession: "Brand Director",
    rating: 5,
    result: "-7.2 KG & TONIFICAZIONE GLUTEI",
    textIt: "Elena è straordinaria: ha capito le mie oscillazioni ormonali e la ritenzione idrica. Nessuna fame folle, pelle compatta e un'energia mai avuta prima.",
    textEn: "Elena is extraordinary. She adjusted for hormonal water retention with zero starvation diets. Tight skin and peak vitality.",
    date: "4 giorni fa",
  },
  {
    id: "rev-4",
    coachId: "coach-luca",
    clientMasked: "Gabriele S.",
    profession: "Commercialista",
    rating: 5,
    result: "DOLORI CERVICALI SPARITI & -6 KG",
    textIt: "Stare 9 ore seduto mi distruggeva la schiena. Il protocollo del Dott. Barbieri mi ha tolto il dolore in 3 settimane e ho rimesso in moto il metabolismo.",
    textEn: "Sitting 9 hours used to wreck my back. Dr. Barbieri's protocol relieved my pain in 3 weeks while boosting my metabolism.",
    date: "2 settimane fa",
  },
];

export const SECURITY_AUDIT_LOGS = [
  { timestamp: "14:48:12", event: "Anti-CSRF & Origin Validation", status: "VERIFICATO", ip: "192.168.1.*** (Anonimizzato)" },
  { timestamp: "14:45:01", event: "XSS Input Sanitization su Lead Form", status: "ATTIVO (0 Minacce)", ip: "87.18.***.***" },
  { timestamp: "14:40:22", event: "Rate Limiter (Max 5 tentativi / min)", status: "PROTETTO", ip: "Sistema Shield" },
  { timestamp: "14:32:09", event: "Privacy Policy Anonymizer (GDPR Ready)", status: "CONFORME", ip: "Tutti i dati crittografati" },
  { timestamp: "14:15:40", event: "SQL / NoSQL Injection Barrier", status: "SICURO", ip: "Audit Passed" },
];
