# Ollama Folder Organizer

Script Python per organizzare file in cartelle usando un LLM locale via Ollama.

## Prerequisiti

1. Installa Ollama: <https://ollama.com>
2. Avvia Ollama:

```bash
ollama serve
```

3. Scarica i modelli:

```bash
ollama pull llama3.2
ollama pull qwen3-vl:8b
```

## Setup Python

```bash
cd Chiara/ollama-folder-organizer
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Modifica `.env` se vuoi usare un modello diverso:

```env
OLLAMA_MODEL=llama3.2
OLLAMA_VISION_MODEL=qwen3-vl:8b
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_TIMEOUT=60
```

## Esecuzione

Modalita interattiva:

```bash
python main.py
```

Oppure con parametri:

```bash
python main.py "/percorso/cartella-da-organizzare"
```

Oppure esplicitando i parametri:

```bash
python main.py --input-dir "/percorso/cartella-da-organizzare" --model llama3.2 --vision-model qwen3-vl:8b --timeout 60
```

Di default lo script lascia i file nella cartella di origine quando riesce a ricavare un nome utile, rinominandoli con nomi leggibili e raggruppandoli in una sottocartella tematica. Per esempio:

```text
cartella-da-organizzare/
  Fatture/
    2026-04-Cliente_Rossi.pdf
  Contratti/
    Accordo_Fornitura.docx
```

Quando un file viene spostato in una cartella di destinazione, il percorso finale usa sempre il formato `CartellaDestinazione/Tema/NomeFile.ext`. I file dubbi finiscono quindi in percorsi come `DaRevisionare/Documenti/DA_REVISIONARE.pdf`.

Il tema viene chiesto al modello Ollama tramite JSON:

```json
{"new_name":"NomeFileSenzaEstensione","target_folder":"Cartella","theme":"TemaFilesystemSafe","reasoning":"motivo breve"}
```

Per compatibilita con i prompt e i modelli precedenti, lo script accetta ancora il vecchio output `Nome___Cartella`: in quel caso calcola un tema deterministico dal nome, dal contenuto estratto, dal tipo file e dalla cartella scelta.

Prima di spostare file dubbi puoi usare la modalita anteprima:

```bash
python main.py --input-dir "/percorso/cartella-da-organizzare" --dry-run
```

Ogni esecuzione registra le operazioni in `.organizer_history.json` dentro la cartella di output. Le rinomine in origine sono salvate con `action: "rename_in_place"`, `target_folder: ""` e il campo `theme`; gli spostamenti in revisione usano `action: "move_to_review"` o `action: "quarantine"`. L'undo ripristina i file nei percorsi originali e rimuove le sottocartelle tematiche rimaste vuote. Per annullare l'ultima sessione completata:

```bash
python undo.py --history "/percorso/cartella-output/.organizer_history.json"
```

## Formati supportati

- PDF
- DOCX
- XLSX
- PPTX
- TXT / MD / CSV / JSON / codice
- PNG / JPG / JPEG / WEBP

Nota: i PDF, DOCX, XLSX e PPTX vengono analizzati estraendo testo localmente. Per PDF scansionati e immagini lo script usa `OLLAMA_VISION_MODEL`, di default `qwen3-vl:8b`. Le presentazioni PPTX vengono limitate alle prime slide e a un estratto breve per evitare timeout su deck molto pesanti.

## Troubleshooting

Se vedi `zsh: command not found: ollama`, Ollama non e installato o non e nel `PATH`.

Su macOS puoi installarlo dall'app ufficiale oppure con Homebrew:

```bash
brew install ollama
```

Dopo l'installazione:

```bash
ollama serve
ollama pull llama3.2
ollama pull qwen3-vl:8b
```

Lo script controlla Ollama prima di processare i file. Se il server locale non risponde o manca il modello testo, esce senza spostare documenti.
