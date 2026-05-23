# Refactor notes

Questa copia e stata riscritta partendo da `main.py` vuoto.

Obiettivo: riscrivere l'organizer in modo mantenibile, separando bene:

- lettura configurazione e argomenti CLI
- scansione dei file
- estrazione contenuto
- classificazione con Ollama
- decisione su cosa fare
- esecuzione sicura delle operazioni filesystem
- logging e undo

## Comportamento scelto

- Default dry-run.
- Applicazione reale solo con `--apply`.
- Rinomina e sposta nella cartella target scelta da Ollama.
- Usa solo cartelle target esistenti; crea solo `DaRevisionare` in `--apply`.
- Scansione ricorsiva saltando cartelle target, `DaRevisionare`, file nascosti e `.organizer_*`.
- Casi incerti, non leggibili o con errore LLM vanno in `DaRevisionare`.
- File non supportati vengono ignorati e registrati nel report.
- Undo registra tutte le mosse reali.

## Direzione tecnica proposta

- Usare oggetti dati espliciti invece di dizionari liberi.
- Eliminare il formato intermedio `nome___cartella`.
- Far restituire al classificatore un risultato strutturato.
- Separare "decidere cosa fare" da "fare davvero la modifica".
- Rendere testabile tutta la logica che non dipende da Ollama o dal filesystem reale.
