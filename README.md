# FolderOrganizer — sito

Il sito di presentazione di FolderOrganizer: React 18, Vite 7, React Router, three.js.
Questo branch contiene solo quello che serve per avviare la pagina.

## Requisiti

- Node.js 20.19 o superiore (oppure 22.12 o superiore): lo richiede Vite 7
- npm (arriva con Node.js)
- Una connessione a internet: i caratteri arrivano da Google Fonts

## Avvio

```powershell
npm install
```

```powershell
npm run dev
```

Poi apri http://localhost:5173. Le modifiche ai file si vedono subito, senza ricaricare.

## Versione da pubblicare

```powershell
npm run build
```

```powershell
npm run preview
```

`build` scrive il sito nella cartella `dist/`; `preview` lo serve su http://localhost:4173 per controllarlo.
È un sito statico con le rotte gestite nel browser: il server che lo ospita deve rispondere con `index.html`
a ogni indirizzo (`/percorso`, `/privacy`, `/termini`).

## Pagine

| Indirizzo   | Cosa mostra                                                              |
| ----------- | ------------------------------------------------------------------------ |
| `/`         | La pagina principale: magazzino 3D, prima e dopo, percorso a tutto schermo, scheda tecnica, domande |
| `/percorso` | Lo stesso percorso in dieci tappe, da solo su una pagina                 |
| `/privacy`  | Informativa sulla privacy                                                |
| `/termini`  | Termini di servizio                                                      |

Nel percorso si avanza scorrendo in giù o di lato (rotella orizzontale, due dita sul trackpad, dito sul telefono)
e con i tasti freccia sinistra e destra.

## Struttura

```
index.html            la pagina che carica tutto
vite.config.js        configurazione di Vite
public/               favicon e icone dei tipi di file
src/main.jsx          punto d'ingresso
src/App.jsx           le rotte
src/pages/            Home, Journey (il percorso), LegalPage
src/home/             magazzino 3D, prima e dopo, schema del programma
src/journey/          dati, motore dello scorrimento, dimostrazioni, scena 3D, pannello di navigazione
src/styles/           journey.css (base e percorso), home.css (pagina principale)
```

I testi e i numeri mostrati nel sito (formati letti, limiti, nomi delle funzioni) vengono da
`src/journey/data.js` e seguono il comportamento del programma `FolderOrganizer.py`.
