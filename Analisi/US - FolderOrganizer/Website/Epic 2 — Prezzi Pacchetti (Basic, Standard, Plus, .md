# Epic 2 — Prezzi / Pacchetti (Basic, Standard, Plus, Lifetime)

### US-2.1 — Pagina prezzi con cards pacchetti

**Come** visitatore

**Voglio** vedere pacchetti e differenze

**Così** scelgo quello giusto

**Acceptance criteria**

- 4 card: Basic, Standard, Plus, Lifetime
- Ogni card mostra: prezzo, cosa include, limiti (file o token), supporto
- Evidenzia “più scelto” (opzionale)

### US-2.2 — Dettaglio cosa include ogni pacchetto

**Come** visitatore

**Voglio** capire cosa cambia tra pacchetti

**Così** non compro quello sbagliato

**Acceptance criteria**

- Lista feature: numero file/mese o crediti, limiti dimensione, priorità supporto, aggiornamenti
- Spiegazione semplice su “token” e come si consumano
- “Lifetime”: cosa significa (licenza app? crediti inclusi? rinnovi?) definito chiaramente

### US-2.3 — Selezione pacchetto e checkout

**Come** visitatore

**Voglio** comprare un pacchetto

**Così** posso usare il software

**Acceptance criteria**

- CTA “Compra” su ogni pacchetto
- Checkout con riepilogo: pacchetto, prezzo, tasse/IVA (se applicabile)
- Pagamento con provider (es. Stripe/PayPal)
- Gestione errori pagamento (carta rifiutata, annullato, timeout)

### US-2.4 — Creazione account post-acquisto (se non loggato)

**Come** utente che compra senza account

**Voglio** creare l’account dopo il pagamento

**Così** accedo ai miei crediti

**Acceptance criteria**

- Se pagamento ok → schermata “crea password” o “link magic”
- Email di conferma + ricevuta
- Se email già esistente → invita a login e associa acquisto

### US-2.5 — Gestione coupon/sconti (opzionale)

**Come** visitatore

**Voglio** inserire un codice sconto

**Così** pago meno

**Acceptance criteria**

- Campo coupon con validazione
- Mostra sconto applicato nel riepilogo