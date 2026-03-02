# Epic 6 — Area Admin (minimo indispensabile)

### US-6.1 — Gestione pacchetti e limiti

**Come** admin

**Voglio** configurare prezzi e limiti

**Così** posso cambiare offerta senza deploy

**Acceptance criteria**

- CRUD pacchetti: prezzo, limiti token/file, feature flags
- Versionamento (non rompere acquisti passati)

### US-6.2 — Gestione utenti e piani

**Come** admin

**Voglio** vedere utenti e piani

**Così** gestisco supporto e problemi

**Acceptance criteria**

- Ricerca per email
- Mostra piano, crediti, storico pagamenti
- Azione: aggiungi crediti manuali (loggato)

### US-6.3 — Monitor pagamenti e webhook

**Come** sistema

**Voglio** ricevere eventi dal provider pagamenti

**Così** attivo piani e aggiorno stato

**Acceptance criteria**

- Webhook “payment succeeded/failed/refunded”
- Idempotenza (stesso evento non duplica crediti)
- Log eventi