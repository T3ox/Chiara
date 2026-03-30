/**
 * PillarsSection — tre card affiancate per i pilastri VEDI, CHIEDI, AGISCI.
 *
 * Tutte e tre sono visibili contemporaneamente. Al passaggio del mouse
 * la card si solleva in primo piano mentre le altre si attenuano leggermente.
 */
import { useMemo } from "react";
import { LANDING_CONTENT } from "../../data/landingContent";
import PillarIcon from "../PillarIcon";
import SmartLink from "../SmartLink";

const stepLabel = (i) => String(i + 1).padStart(2, "0");

export default function PillarsSection() {
  const pillars = useMemo(() => LANDING_CONTENT.pillars.items, []);

  return (
    <section className="section section-alt pillars-section">
      <div className="band-inner">
        <div className="section-head reveal-on-scroll pillars-head">
          <h2>{LANDING_CONTENT.pillars.title}</h2>
          <p className="muted-note">{LANDING_CONTENT.pillars.subtitle}</p>
        </div>

        <div className="pillars-grid" data-reveal-seq>
          {pillars.map((p, i) => (
            <article key={p.key} className="card pillar-card reveal-on-scroll">
              <span className="pillar-step">{stepLabel(i)}</span>

              <div className="pillar-icon-ring">
                <PillarIcon type={p.key} />
              </div>

              <h3 className="pillar-name">{p.name}</h3>
              <p className="pillar-tagline">{p.tagline}</p>
              <p className="pillar-summary">{p.summary}</p>

              <div className="pillar-details">
                {p.details.map((d) => (
                  <div className="pillar-detail" key={d.title}>
                    <h4>{d.title}</h4>
                    <p>{d.body}</p>
                  </div>
                ))}
              </div>

              <SmartLink className="pillar-cta" href={p.ctaHref}>
                {p.cta}
              </SmartLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
