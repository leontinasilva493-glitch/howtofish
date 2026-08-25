import { GuidePageView } from '@/components/guide/GuidePage';
import { getPageByRoute } from '@/content/pages';
import { guideMetadata } from '@/config/seo';

const page = getPageByRoute('/bosses/');
export const metadata = guideMetadata(page);

const bosses = [
  ['Spider Crab lead', 'Lighthouse', 'Opening quest and current objective', 'Keep quest-marked result', 'Forest'],
  ['Giant Piranha', 'Forest', 'Dinner route and current bait prompt', 'Keep quest drop', 'Desert'],
  ['Pufferfish', 'Desert', 'Endangered-creature route and carrot-bait lead', 'Keep quest drop', 'Rocks'],
  ['Terrorizing Bird', 'Rocks', 'Local dialogue and Tuna lead', 'Keep quest item', 'Volcano'],
  ['Bowhead Whale', 'Volcano', 'Military/scientist objective', 'Preserve final requirement', 'Mutated Whale'],
  ['Mutated Bowhead Whale', 'Volcano', 'Final trigger after the scientist route', 'Final hand-in result', 'Ending'],
] as const;

export default function BossesPage() {
  return <GuidePageView page={page}><section className="data-module"><span className="wiki-kicker">VERSION-SENSITIVE ROUTE</span><h2 className="mt-2 font-display text-3xl">All documented story encounters</h2><div className="table-scroll mt-5"><table className="guide-table"><thead><tr><th>Boss</th><th>Area</th><th>Trigger or bait</th><th>Important result</th><th>Next step</th></tr></thead><tbody>{bosses.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div><p className="data-footnote">Names and route leads are not a substitute for the active objective. Exact health and damage vary with Patch 1.0.9 difficulty settings.</p></section></GuidePageView>;
}
