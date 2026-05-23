# Ollama Folder Organizer Clean

Versione refactor dello script Python per organizzare file usando un LLM locale via Ollama.

Questa copia usa un default sicuro: senza `--apply` esegue solo una simulazione.

## Setup

```bash
cd /Users/matteovattimo/Desktop/Git/Chiara/ollama-folder-organizer-clean
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Avvia Ollama e scarica i modelli:

```bash
ollama serve
ollama pull llama3.2
ollama pull qwen3-vl:8b
```

## Uso

Anteprima senza spostare o rinominare file:

```bash
python main.py "/percorso/cartella"
```

Applicazione reale:

```bash
python main.py "/percorso/cartella" --apply
```

Opzioni principali:

```bash
python main.py "/percorso/cartella" \
  --model llama3.2 \
  --vision-model qwen3-vl:8b \
  --base-url http://localhost:11434 \
  --timeout 60
```

## Comportamento

- Scansiona ricorsivamente la cartella scelta.
- Salta cartelle target gia esistenti, `DaRevisionare`, file nascosti e file `.organizer_*`.
- Usa solo cartelle target gia esistenti; `DaRevisionare` e una destinazione speciale.
- In dry-run scrive report e log, ma non rinomina/sposta file e non crea `DaRevisionare`.
- In `--apply` crea `DaRevisionare` se manca.
- File incerti, non leggibili o con errore LLM vanno in `DaRevisionare` mantenendo il nome originale.
- File non supportati vengono ignorati e registrati nel report.
- Undo registra tutte le mosse reali.

## Output

Ogni run crea:

- `.organizer_reports/<sessione>.jsonl`: report operativo, una riga per file.
- `.organizer_logs/<sessione>.llm_usage.jsonl`: token, durata, tentativi ed errori LLM.
- `.organizer_history.json`: solo in `--apply`, usato da `undo.py`.

Per annullare l'ultima sessione reale:

```bash
python undo.py --history "/percorso/cartella/.organizer_history.json"
```
