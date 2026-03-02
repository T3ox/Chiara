# Epic 3 — Account utente (pacchetto, consumi, download, chiavi)

### US-3.1 — Login/Logout/Reset password

**Come** utente

**Voglio** accedere in modo sicuro

**Così** vedo il mio abbonamento e consumi

**Acceptance criteria**

- Login email+password (o magic link)
- Reset password via email
- Logout invalida sessione

### US-3.2 — Dashboard account (overview)

**Come** utente loggato

**Voglio** vedere subito stato del mio piano e crediti

**Così** capisco quanto posso usare

**Acceptance criteria**

- Mostra: piano attivo, data acquisto/scadenza (se non lifetime), token disponibili/usati, file analizzati (se tracciati)
- CTA: “Scarica app .NET” / “Gestisci piano”

### US-3.3 — Storico consumi (token e file)

**Come** utente

**Voglio** vedere lo storico consumi

**Così** controllo cosa ha “bruciato” crediti

**Acceptance criteria**

- Lista per data: job/scan, n° file, token stimati/consumati, esito
- Filtri: range date, esito, cartella (se registrata)
- Export CSV (nice-to-have)

### US-3.4 — Crediti disponibili e soglie

**Come** utente

**Voglio** sapere quando sto finendo i crediti

**Così** non resto bloccato a metà lavoro

**Acceptance criteria**

- Barra progress “x / y token”
- Avviso quando <10% crediti
- Email alert (opzionale)

### US-3.5 — Download software .NET

**Come** utente pagante

**Voglio** scaricare l’app

**Così** posso avviare lo script

**Acceptance criteria**

- Pagina/box con download installer (Windows/macOS se previsto)
- Checksum o versione
- Note requisiti (Python incluso? runtime .NET? permessi cartelle?)

### US-3.6 — Gestione chiave/licenza (se prevista)

**Come** utente

**Voglio** avere una license key o token di accesso

**Così** l’app .NET si autentica alle API

**Acceptance criteria**

- Genera/mostra API key (mascherata) con tasto “rigenera”
- Rigenerare invalida la vecchia
- Rate limit per rigenerazioni

### US-3.7 — Gestione piano (upgrade / acquisto crediti extra)

**Come** utente

**Voglio** fare upgrade o comprare crediti

**Così** continuo a usare il servizio

**Acceptance criteria**

- Upgrade: paga differenza (pro-rata se abbonamento)
- Add-on crediti: acquisto singolo
- Riepilogo fatture

### US-3.8 — Fatture e ricevute

**Come** utente

**Voglio** scaricare fatture/ricevute

**Così** le uso per contabilità

**Acceptance criteria**

- Lista pagamenti con PDF ricevuta (se disponibile)
- Dati intestazione (se raccolti): P.IVA/CF, indirizzo