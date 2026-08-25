'use client';

import { useMemo, useState } from 'react';
import { calculateFishingTrips } from '@/lib/fishing-calculator';

const parseAmount = (value: string) => Number(value.replace(/,/g, ''));

export function Calculator() {
  const [current, setCurrent] = useState('');
  const [target, setTarget] = useState('');
  const [perTrip, setPerTrip] = useState('');
  const result = useMemo(
    () => calculateFishingTrips(parseAmount(current), parseAmount(target), parseAmount(perTrip)),
    [current, target, perTrip],
  );

  return <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
    <form className="wiki-card grid gap-5 p-6" onSubmit={(event) => event.preventDefault()}>
      <label className="grid gap-2 text-sm font-semibold text-wiki-primary">Current coins<input className="rounded-md border border-wiki-border-strong bg-wiki-bg px-3 py-3 text-wiki-primary outline-none focus:border-wiki-accent" inputMode="numeric" value={current} onChange={(event) => setCurrent(event.target.value)} placeholder="120" /></label>
      <label className="grid gap-2 text-sm font-semibold text-wiki-primary">Target amount<input className="rounded-md border border-wiki-border-strong bg-wiki-bg px-3 py-3 text-wiki-primary outline-none focus:border-wiki-accent" inputMode="numeric" value={target} onChange={(event) => setTarget(event.target.value)} placeholder="500" /></label>
      <label className="grid gap-2 text-sm font-semibold text-wiki-primary">Average coins per fishing trip<input className="rounded-md border border-wiki-border-strong bg-wiki-bg px-3 py-3 text-wiki-primary outline-none focus:border-wiki-accent" inputMode="numeric" value={perTrip} onChange={(event) => setPerTrip(event.target.value)} placeholder="90" /></label>
      <button type="submit" className="wiki-button wiki-button-primary">Calculate Trips Needed</button>
    </form>
    <div className="wiki-card bg-wiki-elevated p-6">
      <div className="wiki-kicker">TRIPS TO GOAL</div>
      {result ? <>
        <div className="wiki-heading mt-3 text-7xl text-wiki-accent">{result.trips}</div>
        <p className="mt-3 text-wiki-secondary">normal trips at your current rate — or about <strong className="text-wiki-primary">{result.trickShotTrips}</strong> trips if every catch earns a 2x trick-shot payout.</p>
      </> : <p className="mt-8 text-wiki-danger">Enter a positive per-trip value to calculate.</p>}
      <div className="mt-8 border-t border-wiki-border pt-5 text-sm text-wiki-secondary">The 2x view is a comparison scenario, not a guaranteed catch rate. Use values observed in your current game session.</div>
    </div>
  </div>;
}
