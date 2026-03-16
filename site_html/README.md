# site_html

Versione completa del sito in HTML/CSS/JS puro, senza npm.

## Pagine incluse

- `index.html`
- `prezzi.html`
- `privacy.html`
- `accedi.html`
- `termini.html`
- `login.html` (alias di `accedi.html`)
- `account.html` (alias di `accedi.html`)

## Avvio senza npm

```powershell
cd site_html
python -m http.server 5500
```

Apri `http://127.0.0.1:5500/`.

## Note utili

- Placeholder percorso account: `accedi.html?account=cliente/demo`
- Stile allineato a `site/src/styles/site.css`
- Componenti interattivi in `js/site.js` (menu mobile, tema, accordion, reveal)
