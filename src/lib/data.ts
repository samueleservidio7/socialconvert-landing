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
  conversionRate: number;
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

// I 3 SERVIZI CHIAVE OFFERTI
export interface ServicePlan {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  price: number;
  duration: string;
  popular?: boolean;
  features: string[];
}

export const SERVICE_PLANS: ServicePlan[] = [
  {
    id: "plan-start",
    name: "Protocollo START 90D",
    tagline: "Per chi vuole iniziare con un metodo scientifico collaudato",
    price: 390,
    duration: "3 Mesi",
    features: [
      "Scheda di allenamento su App dedicata (3 sessioni da 45 min)",
      "Guida nutrizionale con calcolo macronutrienti su misura",
      "Guida ristoranti & cene aziendali per non sgarrare",
      "Check-in quindicinale con revisione parametri",
      "Accesso all'Area Privata Clienti con video esecuzioni 4K",
    ],
  },
  {
    id: "plan-elite",
    name: "Protocollo ELITE 90D",
    badge: "PIÙ SCELTO (92% SUCCESSO)",
    tagline: "Il nostro percorso di punta con affiancamento 1-a-1 continuo",
    price: 690,
    duration: "3 Mesi",
    popular: true,
    features: [
      "Tutto ciò che è incluso nel Protocollo START",
      "Coach Dedicato Assegnato in base al tuo profilo metabolico",
      "Check-In Video 1-a-1 Ogni Domenica con feedback personalizzato",
      "Linea Diretta Privata WhatsApp 7 Giorni su 7 con il tuo Coach",
      "Riadattamento settimanale di carichi, calorie e routine",
      "Garanzia Totale 'Risultato o Rimborsato' a 30 giorni",
    ],
  },
  {
    id: "plan-vip",
    name: "Protocollo VIP 180D Immersion",
    badge: "TRASFORMAZIONE TOTALE",
    tagline: "Per chi vuole cambiare per sempre il proprio fisico e stile di vita",
    price: 1190,
    duration: "6 Mesi",
    features: [
      "Tutto ciò che è incluso nel Protocollo ELITE per 6 Mesi",
      "2 Videochiamate di Coaching Strategico al mese con l'Head Coach",
      "Integrazione e supporto per longevità e salute ormonale",
      "Supporto prioritario WhatsApp 24/7 con tempo di risposta < 2h",
      "Accesso a vita all'archivio masterclass e protocolli avanzati",
    ],
  },
];

// DATI AREA PRIVATA CLIENTE (SIMULAZIONE CLIENTE ATTIVO)
export const CLIENT_SESSION_DATA = {
  id: "client-001",
  name: "Francesco L.",
  profession: "Avvocato (Studio Legale Milano)",
  program: "Protocollo ELITE 90D",
  currentWeek: 6,
  totalWeeks: 12,
  coach: {
    name: "Marco 'Metabolic' Valenti",
    role: "Head Coach Ricomposizione",
    avatar: "MV",
    phone: "39333100001",
  },
  stats: {
    startWeight: "88.4 kg",
    currentWeight: "81.6 kg",
    weightLost: "-6.8 kg",
    targetWeight: "78.0 kg",
    bodyFatStart: "22.8%",
    bodyFatCurrent: "16.4%",
    waistStart: "96 cm",
    waistCurrent: "87 cm",
  },
  nutrition: {
    dailyCalories: 2150,
    proteinGrams: 165,
    carbsGrams: 210,
    fatGrams: 65,
    waterLiters: "3.0 L",
    notes: "Durante le cene di lavoro: privilegiare tagli magri di carne o pesce alla griglia e verdure, limitando il pane a 1 porzione. Goditi 1 calice di vino senza sensi di colpa.",
  },
  workoutSplit: [
    {
      day: "Sessione A (Lunedì)",
      title: "Upper Body Push & Core",
      duration: "45 min",
      exercises: [
        { name: "Panca Piana con Bilanciere", sets: "4", reps: "8-10", rest: "90s", load: "75 kg", videoUrl: "https://example.com/panca" },
        { name: "Military Press con Manubri", sets: "3", reps: "10-12", rest: "75s", load: "22 kg per manubrio", videoUrl: "https://example.com/military" },
        { name: "Dip alle Parallele (o Piegamenti)", sets: "3", reps: "12", rest: "60s", load: "Corpo Libero", videoUrl: "https://example.com/dips" },
        { name: "Alzate Laterali al Cavo Singolo", sets: "4", reps: "15", rest: "45s", load: "8 kg", videoUrl: "https://example.com/laterali" },
        { name: "Plank Addominale con Sovraccarico", sets: "3", reps: "45 sec", rest: "45s", load: "+10 kg", videoUrl: "https://example.com/plank" },
      ],
    },
    {
      day: "Sessione B (Mercoledì)",
      title: "Upper Body Pull & Postura",
      duration: "45 min",
      exercises: [
        { name: "Trazioni alla Sbarra (o Lat Machine)", sets: "4", reps: "8", rest: "90s", load: "70 kg", videoUrl: "https://example.com/lat" },
        { name: "Rematore con Manubrio su Panca", sets: "3", reps: "10 per lato", rest: "75s", load: "28 kg", videoUrl: "https://example.com/rematore" },
        { name: "Pulley Basso Presa a V", sets: "3", reps: "12", rest: "60s", load: "55 kg", videoUrl: "https://example.com/pulley" },
        { name: "Face Pull al Cavo Alto (Cuffia dei rotatori)", sets: "4", reps: "15", rest: "45s", load: "20 kg", videoUrl: "https://example.com/facepull" },
        { name: "Curl Bicipiti con Manubri su Inclinata", sets: "3", reps: "12", rest: "60s", load: "14 kg", videoUrl: "https://example.com/bicipiti" },
      ],
    },
    {
      day: "Sessione C (Venerdì)",
      title: "Lower Body & Stimolo Metabolico",
      duration: "50 min",
      exercises: [
        { name: "Goblet Squat (o Squat con Bilanciere)", sets: "4", reps: "10", rest: "90s", load: "32 kg", videoUrl: "https://example.com/squat" },
        { name: "Stacco Rumeno con Manubri (Femorali)", sets: "4", reps: "10-12", rest: "75s", load: "26 kg per manubrio", videoUrl: "https://example.com/stacco" },
        { name: "Affondi Camminati con Manubri", sets: "3", reps: "12 passi per gamba", rest: "60s", load: "16 kg per manubrio", videoUrl: "https://example.com/affondi" },
        { name: "Calf Raise su Gradino per Polpacci", sets: "4", reps: "15", rest: "45s", load: "Corpo libero + peso", videoUrl: "https://example.com/calf" },
        { name: "Hanging Leg Raise (Addome basso)", sets: "3", reps: "12-15", rest: "45s", load: "Corpo Libero", videoUrl: "https://example.com/legraise" },
      ],
    },
  ],
  checkInHistory: [
    { week: "Settimana 5", weight: "82.2 kg", waist: "88 cm", coachFeedback: "Ottimo progresso Francesco! Il deficit calorico sta lavorando perfettamente. Abbiamo alzato di 2.5 kg la panca piana.", date: "Domenica scorsa" },
    { week: "Settimana 4", weight: "83.0 kg", waist: "89 cm", coachFeedback: "Addome visibilmente più piatto. Buona gestione delle cene di lavoro a Roma.", date: "2 settimane fa" },
    { week: "Settimana 3", weight: "84.3 kg", waist: "91 cm", coachFeedback: "Superato il primo adattamento, livelli di energia in netto aumento.", date: "3 settimane fa" },
  ],
};

// DATI FORMATORE (ALLIEVI ASSEGNATI A COACH MARCO)
export const COACH_STUDENTS_ROSTER = [
  { id: "stu-1", name: "Francesco L.", program: "ELITE 90D", week: 6, lastWeight: "81.6 kg (-6.8 kg)", checkInStatus: "In Attesa di Revisione", phone: "+39 340 1234567" },
  { id: "stu-2", name: "Matteo D.", program: "VIP 180D", week: 11, lastWeight: "74.2 kg (+4.8 kg muscolo)", checkInStatus: "Completato", phone: "+39 349 2345678" },
  { id: "stu-3", name: "Elena B.", program: "ELITE 90D", week: 3, lastWeight: "63.4 kg (-2.1 kg)", checkInStatus: "Completato", phone: "+39 335 3456789" },
  { id: "stu-4", name: "Gabriele S.", program: "START 90D", week: 8, lastWeight: "79.0 kg (-5.4 kg)", checkInStatus: "In Attesa di Revisione", phone: "+39 328 4567890" },
  { id: "stu-5", name: "Andrea P.", program: "ELITE 90D", week: 1, lastWeight: "89.5 kg (Inizio)", checkInStatus: "Nuovo Inizio", phone: "+39 333 5678901" },
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
  { timestamp: "15:42:10", event: "Multi-Role Session Authorization (Client / Coach / Admin)", status: "AUTORIZZATO", ip: "192.168.1.*** (Cifrato)" },
  { timestamp: "15:35:12", event: "Anti-CSRF & Origin Validation", status: "VERIFICATO", ip: "192.168.1.*** (Anonimizzato)" },
  { timestamp: "15:22:01", event: "XSS Input Sanitization su Lead Form", status: "ATTIVO (0 Minacce)", ip: "87.18.***.***" },
  { timestamp: "15:10:22", event: "Rate Limiter (Max 5 tentativi / min)", status: "PROTETTO", ip: "Sistema Shield" },
  { timestamp: "14:52:09", event: "Privacy Policy Anonymizer (GDPR Ready)", status: "CONFORME", ip: "Tutti i dati crittografati" },
  { timestamp: "14:15:40", event: "SQL / NoSQL Injection Barrier", status: "SICURO", ip: "Audit Passed" },
];
