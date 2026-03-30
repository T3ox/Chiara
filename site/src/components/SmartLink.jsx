/**
 * SmartLink — link intelligente che usa <Link> di React Router per i percorsi interni
 * (che iniziano con "/") e un normale <a> per i link esterni o le ancore.
 *
 * Props:
 *   href      — destinazione del link (obbligatoria)
 *   className — classi CSS opzionali
 *   children  — contenuto del link
 */
import { Link } from "react-router-dom";

export default function SmartLink({ href, className, children }) {
  // Se non c'è href, non renderiamo nulla
  if (!href) return null;

  // Percorso interno → usa il router di React per evitare ricaricamenti di pagina
  if (href.startsWith("/")) {
    return (
      <Link className={className} to={href}>
        {children}
      </Link>
    );
  }

  // Link esterno o ancora (#section) → usa un normale tag <a>
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}
