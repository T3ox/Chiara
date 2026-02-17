# FolderOrganizer

Repository organizzato in due aree:

- `site/`: landing web (FastAPI + Jinja, no npm)
- `programma/`: script FolderOrganizer + prompt JSON + `.env`

## Avvio sito

```powershell
cd site
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

## Avvio programma

```powershell
cd programma
python FolderOrganizer.py
```
