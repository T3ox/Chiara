/**
 * usePageMeta — hook per aggiornare titolo e meta tag della pagina corrente.
 *
 * Aggiorna document.title, <meta name="description">, <link rel="canonical">,
 * e i tag Open Graph ad ogni cambio di pagina. Ripristina i valori di default
 * quando il componente viene smontato.
 *
 * @param {{ title?: string, description?: string }} options
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BRAND = "FolderOrganizer AI";
const BASE_URL = "https://www.folderorganizer.com";
const DEFAULT_TITLE = `${BRAND} — Organizza i file con l'intelligenza artificiale`;
const DEFAULT_DESC =
  "FolderOrganizer AI analizza i tuoi file e suggerisce nomi e cartelle chiari. Meno lavoro manuale, più ordine in archivi misti di foto, PDF e documenti Office.";

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(name.startsWith("og:") ? "property" : "name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function usePageMeta({ title, description } = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${BRAND}` : DEFAULT_TITLE;
    const desc = description || DEFAULT_DESC;
    const url = `${BASE_URL}${pathname === "/" ? "" : pathname}`;

    document.title = fullTitle;
    setMeta("description", desc);
    setMeta("og:title", fullTitle);
    setMeta("og:description", desc);
    setMeta("og:url", url);
    setCanonical(url);

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, description, pathname]);
}
