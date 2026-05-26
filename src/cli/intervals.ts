export interface IntervalInfo {
  name: string;
  label: string;
}

const INTERVALS = {
  '1m': { name: '1m', label: '1m' },
  '5m': { name: '5m', label: '5m' },
  '10m': { name: '10m', label: '10m' },
  '15m': { name: '15m', label: '15m' },
  '20m': { name: '20m', label: '20m' },
  '30m': { name: '30m', label: '30m' },
  '1h': { name: '1h', label: '1h (60m)' },
  '4h': { name: '4h', label: '4h' },
  '1d': { name: '1d', label: '1d' },
} satisfies Record<string, IntervalInfo>;

export type IntervalName = keyof typeof INTERVALS;

export const DEFAULT_INTERVAL: IntervalName = '1h';

export const intervalNames = (): IntervalName[] => Object.keys(INTERVALS) as IntervalName[];

export function getInterval(name?: string): IntervalInfo {
  const normalized = (name ?? DEFAULT_INTERVAL).toLowerCase();
  return INTERVALS[normalized as IntervalName] ?? INTERVALS[DEFAULT_INTERVAL];
}
