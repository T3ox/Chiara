<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d5aa3e1bd20cc4656de100f5e553c3699a08e105
﻿# FolderOrganizer

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
<<<<<<< HEAD
=======
# FolderOrganizer
>>>>>>> a125d7430386bc510df5cee574266c589f28535a
=======
>>>>>>> d5aa3e1bd20cc4656de100f5e553c3699a08e105
