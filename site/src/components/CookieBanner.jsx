/**
 * CookieBanner.jsx — Banner GDPR per il consenso ai cookie.
 *
 * Funzionalità:
 *  - Mostra un banner al primo accesso con tre opzioni: Accetta tutti, Rifiuta, Personalizza
 *  - Pannello preferenze con tre categorie: Necessari (sempre attivi), Analytics, Marketing
 *  - Salva il consenso in localStorage con timestamp
 *  - Espone una funzione per riaprire il pannello (revoca/modifica dal footer)
 *  - Blocca script analytics/marketing finché il consenso non è dato
 */
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "fo_cookie_consent";

/** Preferenze di default: solo i necessari attivi. */
const DEFAULT_PREFS = {
  necessary: true,
  analytics: false,
  marketing: false,
};

/** Legge il consenso salvato in localStorage. Ritorna null se non presente. */
function readConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Salva il consenso in localStorage con timestamp. */
function saveConsent(prefs) {
  const record = {
    prefs,
    timestamp: new Date().toISOString(),
    version: 1,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

/**
 * Ritorna le preferenze attive correnti (da localStorage o default).
 * Può essere usato da altri moduli per decidere se caricare script.
 */
export function getConsentPrefs() {
  const consent = readConsent();
  return consent ? consent.prefs : DEFAULT_PREFS;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState({ ...DEFAULT_PREFS });

  // Al mount controlla se il consenso è già stato dato
  useEffect(() => {
    const consent = readConsent();
    if (!consent) {
      setVisible(true);
    } else {
      setPrefs(consent.prefs);
    }
  }, []);

  // Listener per riaprire il pannello dal footer (evento custom)
  useEffect(() => {
    const handler = () => {
      const consent = readConsent();
      if (consent) setPrefs(consent.prefs);
      setShowPrefs(true);
      setVisible(true);
    };
    window.addEventListener("open-cookie-settings", handler);
    return () => window.removeEventListener("open-cookie-settings", handler);
  }, []);

  const accept = useCallback((overridePrefs) => {
    const finalPrefs = overridePrefs || prefs;
    saveConsent(finalPrefs);
    setPrefs(finalPrefs);
    setVisible(false);
    setShowPrefs(false);
  }, [prefs]);

  const acceptAll = useCallback(() => {
    accept({ necessary: true, analytics: true, marketing: true });
  }, [accept]);

  const rejectAll = useCallback(() => {
    accept({ ...DEFAULT_PREFS });
  }, [accept]);

  const togglePref = useCallback((key) => {
    if (key === "necessary") return; // sempre attivo
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  if (!visible) return null;

  return (
    <div className="cookie-backdrop" role="dialog" aria-modal="true" aria-label="Consenso cookie">
      <div className="cookie-banner">
        {!showPrefs ? (
          <>
            <div className="cookie-body">
              <h2>Questo sito utilizza i cookie</h2>
              <p>
                Utilizziamo cookie tecnici necessari al funzionamento del sito e, con il tuo consenso,
                cookie di analisi e di marketing per migliorare la tua esperienza.
                Puoi accettare, rifiutare o personalizzare le tue preferenze in qualsiasi momento.
              </p>
              <p className="cookie-detail">
                Per maggiori informazioni consulta la nostra <a href="/privacy">Informativa Privacy</a>.
              </p>
            </div>
            <div className="cookie-actions">
              <button type="button" className="btn btn-solid" onClick={acceptAll}>Accetta tutti</button>
              <button type="button" className="btn btn-outline" onClick={rejectAll}>Rifiuta non necessari</button>
              <button type="button" className="btn btn-ghost" onClick={() => setShowPrefs(true)}>Personalizza</button>
            </div>
          </>
        ) : (
          <>
            <div className="cookie-body">
              <h2>Preferenze cookie</h2>
              <p>Scegli quali categorie di cookie autorizzare. I cookie necessari non possono essere disattivati.</p>

              <div className="cookie-prefs">
                <label className="cookie-pref">
                  <span className="cookie-pref-info">
                    <strong>Necessari</strong>
                    <span>Indispensabili per il funzionamento del sito. Sempre attivi.</span>
                  </span>
                  <input type="checkbox" checked disabled />
                </label>

                <label className="cookie-pref">
                  <span className="cookie-pref-info">
                    <strong>Analytics</strong>
                    <span>Ci aiutano a capire come viene utilizzato il sito per migliorarlo.</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={() => togglePref("analytics")}
                  />
                </label>

                <label className="cookie-pref">
                  <span className="cookie-pref-info">
                    <strong>Marketing</strong>
                    <span>Permettono di mostrare contenuti e annunci pertinenti ai tuoi interessi.</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={prefs.marketing}
                    onChange={() => togglePref("marketing")}
                  />
                </label>
              </div>
            </div>
            <div className="cookie-actions">
              <button type="button" className="btn btn-solid" onClick={() => accept(prefs)}>Salva preferenze</button>
              <button type="button" className="btn btn-outline" onClick={acceptAll}>Accetta tutti</button>
              <button type="button" className="btn btn-ghost" onClick={() => setShowPrefs(false)}>Indietro</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
