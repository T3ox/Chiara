import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FILES, FOLDERS } from "../journey/data";
import { FileIcon } from "../journey/demos";

/*
  The nine example files, before and after, wired together: one line from each file as it is today to where it
  ends up, so the eye can follow any single file. The lines are measured from the rows themselves, so they stay
  right at every width; they draw once, when the picture comes on screen. On a phone there is no room for
  wires: each filed row says the old name instead.
*/
export default function BeforeAfter() {
  const box = useRef(null);
  const [wires, setWires] = useState({ w: 0, h: 0, d: [] });
  const [seen, setSeen] = useState(false);
  const [hot, setHot] = useState(null);

  useLayoutEffect(() => {
    const el = box.current;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const d = FILES.map((f) => {
        const a = el.querySelector(`[data-from="${f.id}"]`)?.getBoundingClientRect();
        const b = el.querySelector(`[data-to="${f.id}"]`)?.getBoundingClientRect();
        if (!a || !b || b.left <= a.right) return "";
        const x1 = a.right - r.left;
        const y1 = a.top + a.height / 2 - r.top;
        const x2 = b.left - r.left;
        const y2 = b.top + b.height / 2 - r.top;
        const bend = (x2 - x1) * 0.55;
        return `M${x1.toFixed(1)},${y1.toFixed(1)} C${(x1 + bend).toFixed(1)},${y1.toFixed(1)} ${(x2 - bend).toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
      });
      setWires({ w: r.width, h: r.height, d });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(box.current);
    return () => io.disconnect();
  }, []);

  const over = (id) => ({ onMouseEnter: () => setHot(id), onMouseLeave: () => setHot(null) });
  const cls = (base, f) => `${base}${f.folder === "DaRevisionare" ? " is-warn" : ""}${hot === f.id ? " is-hot" : ""}`;

  return (
    <div className={`wire${seen ? " is-seen" : ""}${hot ? " has-hot" : ""}`} ref={box}>
      <div className="wire__col">
        <p className="wire__h mono">oggi · INPUT_FILES</p>
        {FILES.map((f) => (
          <span key={f.id} className={cls("wire__f", f)} data-from={f.id} {...over(f.id)}>
            <FileIcon kind={f.kind} size={16} /><span>{f.name}</span>
          </span>
        ))}
      </div>
      <div className="wire__col wire__col--after">
        <p className="wire__h mono">dopo · le tue cartelle</p>
        {FOLDERS.map((folder) => (
          <div key={folder} className={`wire__folder${folder === "DaRevisionare" ? " is-warn" : ""}`}>
            <p className="mono">{folder.replace("/", " / ")}</p>
            {FILES.filter((f) => f.folder === folder).map((f) => (
              <span key={f.id} className={cls("wire__f", f)} data-to={f.id} {...over(f.id)}>
                <FileIcon kind={f.kind} size={16} />
                <span>{f.out}<small>era: {f.name}</small></span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <svg className="wire__svg" width={wires.w} height={wires.h} viewBox={`0 0 ${wires.w || 1} ${wires.h || 1}`} aria-hidden="true">
        {FILES.map((f, k) => (
          <path
            key={f.id}
            d={wires.d[k] || "M0,0"}
            pathLength="1"
            className={cls("wire__p", f)}
            // the gaps between one line and the next get shorter: a wave, not a metronome
            style={{ "--d": `${Math.round(900 * (1 - Math.pow(1 - k / FILES.length, 1.8)))}ms` }}
          />
        ))}
      </svg>
    </div>
  );
}
