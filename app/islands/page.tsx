import { GuidePageView } from '@/components/guide/GuidePage';
import { IslandProgression } from '@/components/guide/IslandProgression';
import { getPageByRoute } from '@/content/pages';
import { guideMetadata } from '@/config/seo';

const page = getPageByRoute('/islands/');
export const metadata = guideMetadata(page);

const areas = [
  ['Lighthouse', 'Starting area', 'Opening keeper route', 'Spider Crab lead', 'Quest-marked result', 'Forest'],
  ['Forest', 'Lighthouse hand-in', 'Dinner request', 'Giant Piranha', 'Quest drop', 'Desert'],
  ['Desert', 'Forest hand-in', 'Endangered target', 'Pufferfish', 'Quest drop', 'Rocks'],
  ['Rocks', 'Desert hand-in', 'Tuna route', 'Terrorizing Bird', 'Quest item', 'Volcano'],
  ['Volcano', 'Rocks hand-in', 'Military + scientist', 'Whale sequence', 'Final result', 'Ending'],
] as const;

export default function IslandsPage() {
  return <GuidePageView page={page}><section className="data-module"><span className="wiki-kicker">START + FOUR UNLOCKS</span><h2 className="mt-2 font-display text-3xl">Island order and unlock table</h2><div className="mt-6"><IslandProgression /></div><div className="table-scroll mt-6"><table className="guide-table"><thead><tr><th>Area</th><th>Unlock requirement</th><th>Main quest</th><th>Main encounter</th><th>Important result</th><th>Next</th></tr></thead><tbody>{areas.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></section></GuidePageView>;
}
