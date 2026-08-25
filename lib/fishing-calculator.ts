export type FishingTripEstimate = {
  trips: number;
  trickShotTrips: number;
};

export function calculateFishingTrips(current: number, target: number, perTrip: number): FishingTripEstimate | null {
  if (![current, target, perTrip].every(Number.isFinite) || perTrip <= 0) return null;

  const remaining = Math.max(0, target - current);
  return {
    trips: Math.ceil(remaining / perTrip),
    trickShotTrips: Math.ceil(remaining / (perTrip * 2)),
  };
}
