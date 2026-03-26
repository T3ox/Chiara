# FolderOrganizer

Repository organizzato in due aree:

- `site/`: frontend landing in React + Vite
- `programma/`: script FolderOrganizer + prompt JSON + `.env`
- `desktop/FolderOrganizer.Desktop/`: app desktop Windows (WPF + WebView2) che carica la landing statica senza npm

## Avvio sito (React + Vite)

```powershell
cd site
npm install
npm run dev
```

Apri `http://127.0.0.1:5173`.

## Avvio programma

```powershell
cd programma
python FolderOrganizer.py
```

## Avvio desktop Windows (senza npm)

Prerequisiti:

- .NET SDK 8+
- WebView2 Runtime

```powershell
cd desktop/FolderOrganizer.Desktop
dotnet restore
dotnet run
```
