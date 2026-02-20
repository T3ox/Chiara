# Epic 8 — Gestione Versione e Aggiornamenti

## US-8.1 — Controllo versione all’avvio

**Come** utente

**Voglio** che all’apertura il client controlli se esiste una versione più recente

**Così** resto aggiornato automaticamente

**AC**

- All’avvio viene chiamato un endpoint/DB con la versione installata
- Confronto tra versione locale e versione disponibile
- Se offline → l’app continua senza bloccarsi
- Log tecnico del risultato

---

## US-8.2 — Notifica aggiornamento disponibile

**Come** utente

**Voglio** essere avvisato quando esiste una nuova versione

**Così** posso decidere se aggiornare

**AC**

- Modal con versione attuale e nuova versione
- Changelog breve
- Bottoni: “Aggiorna ora” / “Più tardi”
- Se “Più tardi” → non riproporre nella stessa sessione

---

## US-8.3 — Download aggiornamento

**Come** utente

**Voglio** scaricare l’aggiornamento in modo affidabile

**Così** non rischio installazioni corrotte

**AC**

- Download con barra di avanzamento
- Retry automatico su errori temporanei
- Verifica checksum/firma
- Possibilità di annullare

---

## US-8.4 — Installazione aggiornamento

**Come** utente

**Voglio** installare l’aggiornamento facilmente

**Così** continuo a usare il client senza interruzioni

**AC**

- Pulsante “Installa e riavvia”
- Chiusura sicura dell’app
- Fallback in caso di errore