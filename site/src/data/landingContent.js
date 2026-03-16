/**
 * landingContent.js — unica fonte di verità per tutti i testi e i dati del sito.
 *
 * Struttura dell'oggetto LANDING_CONTENT:
 *  settings    — configurazioni operative (modalità preview, stato duplicati)
 *  site        — nome prodotto, tagline, email
 *  nav         — voci della navbar della landing (ancore #sezione)
 *  hero        — testi e dati della sezione hero principale
 *  tools       — formati file supportati (per il carosello)
 *  why         — sezione "Perché usarlo": problemi, risultati, casi d'uso, limiti, esempi
 *  pillars     — i 3 pilastri: VEDI, CHIEDI, AGISCI
 *  how         — flusso in 5 step, note governance, note privacy
 *  comparison  — tabella confronto con alternative
 *  faq         — domande frequenti con tag per la ricerca
 *  pricing     — piani e prezzi (pagina /prezzi)
 *  demo        — info sessione demo (pagina /demo)
 *  footer      — note e link nel footer
 *
 * Per modificare i testi del sito, basta aggiornare questo file.
 * Non serve toccare i componenti React.
 */

// === IMPOSTAZIONI OPERATIVE ===
// PREVIEW_MODE: se true, ogni run mostra un'anteprima e chiede conferma prima di applicare
export const PREVIEW_MODE = true;

// DEDUPE_STATUS: stato della funzionalità di gestione duplicati
//   "planned"       → in sviluppo, mostra badge "In arrivo"
//   "available"     → disponibile, mostra ✔ nella tabella di confronto
//   "not_available" → non disponibile
export const DEDUPE_STATUS = "planned";

const modeText = PREVIEW_MODE ? "Preview e conferma" : "Esecuzione diretta";

export const LANDING_CONTENT = {
  // --- Impostazioni (usate dai componenti per logica condizionale) ---
  settings: {
    PREVIEW_MODE,
    DEDUPE_STATUS,
  },

  // --- Identità del prodotto ---
  site: {
    productName: "FolderOrganizer AI",
    tagline: "Organizza i file in modo semplice, ordinato e coerente.",
    contactEmail: "contatti@folderorganizer.com",
  },

  // --- Navigazione della landing: ancore alle sezioni della homepage ---
  nav: [
    { label: "Perché", href: "#perche" },
    { label: "Come funziona", href: "#come-funziona" },
    { label: "Confronto", href: "#confronto" },
    { label: "FAQ", href: "#faq" },
  ],

  // --- Sezione Hero ---
  hero: {
    eyebrow: "Per team che vogliono ordine e semplicità",
    title: "Metti ordine nei file senza stress, con\u00A0l'aiuto dell'AI",
    subtitle:
      "FolderOrganizer AI legge i tuoi file e suggerisce nomi e cartelle chiari: così tutti trovano tutto più in fretta, senza dover ricordare ogni convenzione.",
    // Tre punti chiave mostrati come lista nell'hero
    bullets: [
      "Cosa fa: analizza il contenuto dei file e propone una struttura ordinata.",
      "Per chi: chi lavora con foto, PDF, documenti Office e archivi misti.",
      "Risultato: cartelle pulite, ricerca più veloce e meno tempo perso.",
    ],
    // Pulsanti CTA principali
    ctas: [
      { label: "Vedi prezzi", href: "/prezzi", variant: "solid" },
      { label: "Prova demo", href: "/demo", variant: "outline" },
    ],
    microcopy: "Si parte da una cartella piccola, si verifica il risultato, poi si allarga.",
    trustNote: modeText,
    // Chip mostrati nella barra di fiducia sotto i CTA (mostra solo i primi 3)
    trustStrip: ["Attenzione alla privacy", "Costi sotto controllo", "Nessun lock-in", "Si parte per gradi"],
    // Card KPI nel pannello visivo a destra dell'hero
    kpis: [
      { title: "Meno lavoro manuale", text: "Rinomina e sposta centinaia di file in minuti, non ore." },
      { title: "Nomi coerenti", text: "Tutti usano le stesse convenzioni, senza ambiguità." },
      { title: "Controllo totale", text: "Vedi ogni modifica proposta prima di applicarla." },
    ],
  },

  // --- Carosello formati supportati ---
  tools: {
    title: "Formati supportati",
    subtitle: "Immagini, PDF e Office: tutto quello che gestisci ogni giorno.",
    items: [
      { label: "Immagini", icon: "/img/file-icons/file-image.svg" },
      { label: "PDF", icon: "/img/file-icons/file-pdf.svg" },
      { label: "Word", icon: "/img/office/word.svg" },
      { label: "Excel", icon: "/img/office/excel.svg" },
      { label: "Outlook", icon: "/img/office/outlook.svg" },
      { label: "PowerPoint", icon: "/img/office/powerpoint.svg" },
    ],
  },

  // --- Sezione "Perché usarlo" ---
  why: {
    title: "Perché usarlo",
    intro:
      "Quando i file crescono, le regole rigide non bastano più. Serve uno strumento che capisca il contenuto, non solo il nome del file.",
    // Problemi che gli utenti riconoscono nella loro situazione attuale
    pains: [
      "Nomi diversi per file simili: impossibile trovare quello giusto al primo tentativo.",
      "Cartelle doppie o abbandonate che creano confusione nei team.",
      "Ogni persona adotta un metodo diverso, rendendo gli archivi incoerenti.",
    ],
    // Casi d'uso concreti in cui il prodotto è utile
    useCases: [
      "Foto, scan e documenti che arrivano da scanner, email o upload disorganizzati",
      "Cartelle di download con nomi automatici e file duplicati",
      "Archivi condivisi dove ogni reparto ha il suo metodo di denominazione",
    ],
    // Benefici misurabili dopo l'adozione
    outcomes: [
      "Cartelle più ordinate e comprensibili anche per chi le vede per la prima volta.",
      "Meno errori nella consegna e nel controllo di documenti importanti.",
      "Continuità operativa anche quando cambia il personale che gestisce i file.",
    ],
    // Limiti onesti da comunicare agli utenti
    limits: [
      "Se i file sono poco leggibili (scansioni storte, testo irriconoscibile), i risultati sono meno precisi.",
      "Alcuni documenti ambigui possono richiedere una revisione manuale.",
      "Consigliamo sempre di partire con un piccolo test su un sottoinsieme di file.",
    ],
    // File di esempio per il simulatore Prima/Dopo (sezione use case)
    examples: {
      // Lista piatta disordinata — stato "Prima"
      before: [
        "IMG_2048.jpg",
        "IMG_2051.jpg",
        "scan_finale(2).pdf",
        "scan_fornitore_17.pdf",
        "nuovo_documento.docx",
        "allegato_mail.msg",
        "report_v3_def.xlsx",
      ],
      // Lista organizzata in cartelle — stato "Dopo"
      // Formato: "Cartella/Sottocartella/nome-file.ext"
      after: [
        "Clienti/2025/Sopralluoghi/cliente-rossi-001.jpg",
        "Clienti/2025/Sopralluoghi/cliente-rossi-002.jpg",
        "Amministrazione/Fatture/2025/fattura-fornitore-17.pdf",
        "Amministrazione/Fatture/2025/fattura-fornitore-18.pdf",
        "Operativo/Procedure/procedura-onboarding.docx",
        "Comunicazioni/Email/allegato-cliente.msg",
        "Reporting/2025/report-mensile-finanza.xlsx",
      ],
    },
  },

  // --- I 3 Pilastri del prodotto (sezione carosello) ---
  pillars: {
    title: "Come funziona in 3 pilastri",
    subtitle: "Tre fasi che trasformano una cartella disordinata in una struttura chiara e condivisa.",
    items: [
      {
        key: "see",        // corrisponde al tipo in PillarIcon.jsx
        name: "VEDI",
        tagline: "La fotografia della cartella",
        summary: "Analizza nomi, contenuti e metadati per capire cosa c'è davvero nella cartella.",
        cta: "Scopri di più",
        ctaHref: "#come-funziona",
        details: [
          {
            title: "Mappa subito i file",
            body: "Identifica formati, temi ricorrenti e zone a rischio di confusione prima di toccare nulla.",
          },
          {
            title: "Evidenzia il disordine",
            body: "Segnala duplicati, versioni multiple e pattern di naming incoerenti.",
          },
        ],
      },
      {
        key: "ask",
        name: "CHIEDI",
        tagline: "Il copilota operativo",
        summary: "Descrivi a parole tue come vuoi i file: l'AI interpreta e genera regole coerenti.",
        cta: "Scopri di più",
        ctaHref: "#come-funziona",
        details: [
          {
            title: "Linguaggio naturale",
            body: "Scrivi poche righe su come vuoi organizzare le cartelle e l'AI capisce la logica.",
          },
          {
            title: "Regole riutilizzabili",
            body: "Le richieste diventano criteri replicabili tra team diversi e nel tempo.",
          },
        ],
      },
      {
        key: "act",
        name: "AGISCI",
        tagline: "Applica in sicurezza",
        summary: "Conferma prima di spostare e ottieni un output ordinato, verificabile e tracciato.",
        cta: "Richiedi demo",
        ctaHref: "/demo",
        details: [
          {
            title: "Anteprima chiara",
            body: "Vedi l'elenco completo delle modifiche proposte e approva solo quelle che ti convincono.",
          },
          {
            title: "Output pronto per il team",
            body: "Cartelle standard, nomi coerenti e meno frizioni operative da subito.",
          },
        ],
      },
    ],
  },

  // --- Sezione "Come funziona" (stepper a 5 step) ---
  how: {
    title: "Come funziona",
    subtitle: "Un percorso trasparente e completamente sotto il tuo controllo.",
    steps: [
      {
        title: "Installazione",
        detail: "Configuri l'app sul tuo computer in pochi minuti.",
        longDetail:
          "L'app gira localmente sulla tua macchina o su un server di rete. Si verificano permessi, accessi e prerequisiti, e si definisce dove salvare log e report. I file non lasciano mai la tua infrastruttura.",
      },
      {
        title: "Definisci il perimetro",
        detail: "Scegli le cartelle da organizzare e le regole di naming.",
        longDetail:
          "Indichi la cartella di lavoro, i file da escludere (es. file di sistema), la lingua dei nomi e le categorie principali. L'AI userà queste preferenze come base per tutte le sue proposte.",
      },
      {
        title: "Analisi AI",
        detail: "L'AI legge metadati e contenuto di ogni file per classificarlo.",
        longDetail:
          "Per ogni file vengono estratti metadati (data, tipo, dimensione) e — dove utile — una porzione di testo. L'AI propone nome e cartella di destinazione; i casi ambigui vengono segnalati esplicitamente per la tua revisione.",
      },
      {
        title: "Anteprima modifiche",
        detail: "Ricevi l'elenco completo delle proposte prima di applicare qualsiasi cosa.",
        longDetail:
          "Vedi file per file: nome attuale → nome proposto, cartella attuale → destinazione. Puoi accettare tutto, modificare singole voci o annullare l'intera operazione. Nessun file viene toccato finché non confermi.",
      },
      {
        title: "Applica e documenta",
        detail: "Solo dopo la tua conferma vengono eseguiti spostamenti e rinominazioni.",
        longDetail:
          "Dopo l'approvazione, l'app esegue le modifiche in modo ordinato e tracciabile. Al termine ricevi un log completo: ogni file spostato o rinominato, con le regole applicate — utile per audit e verifiche future.",
      },
    ],
    // Tre punti rassicuranti mostrati sotto lo stepper
    reassurances: [
      {
        label: "Privacy by design",
        note: "Solo metadati e testo estratto, mai file completi inviati all'esterno.",
      },
      {
        label: "Sempre in anteprima",
        note: "Nessuna modifica viene applicata senza la tua conferma esplicita.",
      },
      {
        label: "Log completo",
        note: "Ogni azione è tracciata e verificabile a posteriori, senza sorprese.",
      },
    ],
  },

  // --- Tabella confronto con alternative ---
  comparison: {
    title: "Confronto con alternative",
    subtitle: "Un confronto diretto e onesto.",
    readingGuide: "Legenda: ✔ disponibile, — non disponibile, badge \"In arrivo\" per funzioni pianificate.",
    columns: [
      "Feature",
      "Organizer tradizionali (regole statiche)",
      "Questo prodotto (AI sul contenuto)",
    ],
    rows: [
      {
        feature: "Criterio di organizzazione",
        traditional: "Regole fisse su nome file o estensione",
        product: "AI che legge il contenuto e i metadati",
      },
      {
        feature: "Riconoscimento documenti",
        traditional: "Limitato al tipo di file",
        product: "Comprende il contenuto effettivo",
      },
      {
        feature: "Naming intelligente",
        traditional: "Manuale o basato su template rigidi",
        product: "Suggerimenti contestuali e coerenti",
      },
      {
        // Riga speciale: il componente ComparisonSection usa row.key === "dedupe"
        // per mostrare il badge dinamico in base a DEDUPE_STATUS
        feature: "Gestione duplicati",
        key: "dedupe",
      },
    ],
  },

  // --- FAQ con ricerca e tag ---
  faq: {
    title: "Domande frequenti",
    subtitle: "Risposte semplici ai dubbi più comuni.",
    // I tag permettono la ricerca testuale nella FaqSection
    items: [
      {
        q: "Come incidono token e costi API?",
        a: "Dipende dal numero di file e dalla quantità di testo analizzato. Consigliamo di partire con un piccolo test per stimare i costi reali prima di elaborare archivi grandi.",
        tags: ["token", "costi", "openai"],
      },
      {
        q: "Quali dati vengono inviati a OpenAI?",
        a: "Solo i dati necessari per capire il contenuto: metadati del file o testo estratto. Non inviamo file completi né dati personali non necessari all'analisi.",
        tags: ["privacy", "dati", "openai"],
      },
      {
        q: "Quali formati di file sono supportati?",
        a: "Di solito PDF, immagini (JPG, PNG) e documenti Office (Word, Excel, Outlook, PowerPoint). Il supporto esatto dipende dalla configurazione scelta.",
        tags: ["file", "supporto", "formati"],
      },
      {
        q: "Quanto tempo richiede l'elaborazione?",
        a: "Dipende dal numero di file e dalla loro qualità. Conviene misurare i tempi su un test iniziale per calibrare le aspettative.",
        tags: ["tempi", "performance"],
      },
      {
        q: "È previsto un rollback automatico?",
        a: "Non sempre. Se il rollback automatico non è disponibile, è fondamentale usare la modalità anteprima e fare un backup prima di ogni run.",
        tags: ["rollback", "backup", "sicurezza"],
      },
      {
        q: "Quali requisiti di sistema servono?",
        a: "Windows con .NET installato, Python per il modulo di analisi e accesso a OpenAI secondo le policy aziendali.",
        tags: ["requisiti", "os", "dotnet"],
      },
    ],
  },

  // --- Pagina prezzi (/prezzi) ---
  pricing: {
    title: "Prezzi",
    subtitle: "Piani indicativi. Il prezzo finale viene definito sul caso reale.",
    qualification:
      "Il costo dipende dal volume di file, dalla complessità della struttura e dal livello di controllo richiesto.",
    plans: [
      {
        name: "Free Demo",
        price: "0 EUR",
        label: null,
        idealFor: "Per chi vuole capire se il prodotto fa al caso suo prima di impegnarsi.",
        points: ["Sessione guidata con pochi file reali", "Verifica tecnica iniziale", "Nessun impegno"],
        cta: "Richiedi demo",
      },
      {
        name: "Pro",
        price: "Da definire",
        label: null,
        idealFor: "Un team che ha bisogno di ordine costante nei propri archivi.",
        points: ["Setup personalizzato per un team", "Regole di naming condivise", "Supporto all'avvio"],
        cta: "Contatta vendite",
      },
      {
        name: "Team",
        price: "Da definire",
        label: null,
        idealFor: "Più team o reparti con standard comuni da mantenere nel tempo.",
        points: ["Adozione multi-team", "Standard condivisi e documentati", "Roadmap di evoluzione"],
        cta: "Parla con noi",
      },
    ],
  },

  // --- Pagina demo (/demo) ---
  demo: {
    title: "Demo",
    body:
      "Sessione guidata disponibile su richiesta. Ti mostriamo un esempio reale su file simili ai tuoi, con spazio per domande su privacy e costi.",
    includes: [
      "Panoramica pratica: cosa succede prima, durante e dopo l'elaborazione.",
      "Esempio prima/dopo su una cartella reale o simulata.",
      "Risposte alle tue domande su privacy, costi e integrazione.",
    ],
    cta: {
      label: "Prenota una call demo",
      href: "mailto:contatti@folderorganizer.com?subject=Richiesta%20demo%20FolderOrganizer%20AI",
    },
  },

  // --- Footer ---
  footer: {
    lines: [
      "Privacy: inviamo solo i dati necessari all'analisi e rispettiamo le policy aziendali.",
      "I risultati dipendono dalla qualità e leggibilità dei file elaborati.",
    ],
    links: [
      { label: "Contatti", href: "mailto:contatti@folderorganizer.com" },
    ],
  },
};
