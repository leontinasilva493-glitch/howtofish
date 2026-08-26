import type { GuidePage } from '@/content/types';

const directAnswerSections = new Set(['quick-start', 'fishing-basics', 'lighthouse-chapter', 'next-steps', 'verification']);

export function HomeGuideBody({ sections }: { sections: GuidePage['sections'] }) {
  return <article className="guide-content home-guide-content">
    {sections.filter((section) => directAnswerSections.has(section.id)).map((section) => <section className="guide-content-section" id={section.id} key={section.id}>
      <h2>{section.title}</h2>
      {section.intro ? <p>{section.intro}</p> : null}
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.steps ? <ol>{section.steps.map((step) => <li key={step}>{step}</li>)}</ol> : null}
      {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
    </section>)}
  </article>;
}
