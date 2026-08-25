import { IssueStatusTag, type IssueState } from './DesignSystem';

const issues: Array<[string, IssueState, string]> = [
  ['Save corruption', 'attempted-fix', 'Patch 1.0.9 says “Hopefully fixed”; remaining cases go to current official Discord guidance.'],
  ['Lost inventory or upgrades', 'still-reported', 'Protect the save copy. Community reports do not establish one universal recovery method.'],
  ['Missing Radar', 'still-reported', 'Treat as save or inventory loss until current support guidance identifies a safer path.'],
  ['Join black screen', 'attempted-fix', 'Patch 1.0.4 attempted a fix; Patch 1.0.9 added the Relay diagnostic.'],
  ['Red Steam Relay text', 'officially-acknowledged', 'Patch 1.0.9 directs players to the official Discord common-bugs channel.'],
  ['Crash while equipping weapons', 'officially-acknowledged', 'Patch 1.0.9 specifically directs affected players to official Discord guidance.'],
];

export function IssueStatusTable() {
  return <section className="data-module issue-module" aria-labelledby="issue-status-title"><div className="data-module-head"><div><span className="v2-kicker v2-kicker-wiki">Current patch status</span><h2 id="issue-status-title">Known, attempted, and still reported</h2></div></div><div className="table-scroll"><table className="guide-table issue-table"><thead><tr><th>Problem</th><th>Status</th><th>What that means</th></tr></thead><tbody>{issues.map(([problem, state, meaning]) => <tr key={problem}><th scope="row">{problem}</th><td><IssueStatusTag state={state} /></td><td>{meaning}</td></tr>)}</tbody></table></div></section>;
}
