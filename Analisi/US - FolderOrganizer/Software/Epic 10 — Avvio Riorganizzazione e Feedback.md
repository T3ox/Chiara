# Epic 10 — Avvio Riorganizzazione e Feedback

## US-10.1 — Avvio processo riorganizzazione

**Come** utente

**Voglio** avviare il processo con un bottone

**Così** parte l’analisi della cartella

**AC**

- Bottone attivo solo se cartella valida
- Avvio script Python con config JSON
- Gestione errori di esecuzione

---

## US-10.2 — Feedback visivo e stato operazione

**Come** utente

**Voglio** vedere che l’app sta lavorando

**Così** non penso sia bloccata

**AC**

- Loader animato
- Stato testuale (Scansione, Analisi, Rinomina…)
- Numero file processati

---

## US-10.3 — Annullamento operazione

**Come** utente

**Voglio** poter interrompere il processo

**Così** posso fermarmi in caso di errore

**AC**

- Bottone “Annulla”
- Stop controllato dello script
- Messaggio finale coerente

---

## US-10.4 — Report finale

**Come** utente

**Voglio** vedere un riepilogo finale

**Così** capisco cosa è stato modificato

**AC**

- File rinominati
- File spostati
- File ignorati
- Errori
- Possibilità di aprire cartella