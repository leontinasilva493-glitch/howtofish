import Image from 'next/image';
import type { EvidenceRow, FailureBranch, GuideMedia, GuideSection } from '@/content/types';
import { sources } from '@/content/sources';
import { GuideCallout } from './DesignSystem';

export function GuideSections({ sections }: { sections: GuideSection[] }) {
  return (
    <article className="guide-content">
      {sections.map((section) => (
        <section id={section.id} className="guide-content-section" key={section.id}>
          <h2>{section.title}</h2>
          {section.intro ? <p>{section.intro}</p> : null}
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.steps ? <ol>{section.steps.map((step) => <li key={step}>{step}</li>)}</ol> : null}
          {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
          {section.callout ? <GuideCallout title={section.callout.title} variant={section.callout.tone === 'warning' ? 'warning' : 'tip'}><p>{section.callout.text}</p></GuideCallout> : null}
        </section>
      ))}
    </article>
  );
}

export function EvidenceSplitTable({ rows }: { rows?: EvidenceRow[] }) {
  if (!rows?.length) return null;
  return (
    <section className="editorial-table-section" aria-labelledby="evidence-split-title">
      <h2 id="evidence-split-title">What is official, and what is community-documented?</h2>
      <div className="table-scroll">
        <table className="guide-table editorial-table">
          <thead><tr><th>Topic</th><th>Official fact</th><th>Community route</th><th>Safe guidance</th></tr></thead>
          <tbody>{rows.map((row) => <tr key={row.topic}><th scope="row">{row.topic}</th><td>{row.official}</td><td>{row.community}</td><td>{row.guidance}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

export function FailureBranchTable({ rows, title = 'Why has the next island not unlocked?' }: { rows?: FailureBranch[]; title?: string }) {
  if (!rows?.length) return null;
  return (
    <section className="editorial-table-section" aria-labelledby="failure-branch-title">
      <h2 id="failure-branch-title">{title}</h2>
      <div className="table-scroll">
        <table className="guide-table editorial-table">
          <thead><tr><th>What you see</th><th>Likely state</th><th>Next safe step</th></tr></thead>
          <tbody>{rows.map((row) => <tr key={row.symptom}><th scope="row">{row.symptom}</th><td>{row.likelyState}</td><td>{row.nextStep}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

export function GuideMediaBlock({ media }: { media?: GuideMedia }) {
  if (!media?.gallery.length) return null;
  return (
    <section className="guide-media-block" aria-labelledby="guide-media-title">
      <h2 id="guide-media-title">Official in-game screenshots</h2>
      <p className="guide-media-note">These Steam images show real gameplay and facilities. They provide visual context, not proof of a quest trigger or route coordinate.</p>
      <div className="guide-media-gallery">{media.gallery.map((item) => <figure key={item.src}><div className="guide-media-image"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 767px) 100vw, 50vw" /></div><figcaption>{item.caption} <span>{sources[item.sourceId]?.label ?? item.sourceId}</span></figcaption></figure>)}</div>
    </section>
  );
}
