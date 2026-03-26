# FolderOrganizer Site (No-NPM)

Landing commerciale realizzata con FastAPI + Jinja + asset statici CSS/JS.

## Requisiti

- Python 3.11+ (consigliato)

## Avvio locale

```powershell
cd site
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Apri:

- `http://127.0.0.1:8000/`

## Rotte principali

- `/` Home
- `/prezzi`
- `/privacy`
- `/accedi`
- `/termini`
- `/account/{path}` (alias placeholder accesso)
