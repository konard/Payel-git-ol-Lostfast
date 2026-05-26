import type { Strategy } from '../strategy.js';
import { closes, lastCandle } from '../../domain/candle.js';
import { neutral } from '../../domain/signal.js';
import { atr, lastDefined } from '../indicators.js';
import { makeSignal } from '../helpers.js';

/**
 * Support / Resistance with ATR-based zones.
 * Support zone = [recent low, recent low + 0.7 * ATR]
 * Resistance zone = [recent high - 0.7 * ATR, recent high]
 * Only fires when price is inside a zone (volatility-adjusted, not fixed 0.1%).
 */
export const supportResistance: Strategy = {
  id: 'support-resistance',
  title: 'Support & Resistance',
  minCandles: 30,

  evaluate(candles, symbol, _params) {
    const at = lastCandle(candles)?.openTime ?? Date.now();
    if (candles.length < this.minCandles) return neutral(this.id, symbol, at, 'Not enough data');

    const window = candles.slice(-25);
    const support = Math.min(...window.map((c) => c.low));
    const resistance = Math.max(...window.map((c) => c.high));
    const current = closes(candles)[candles.length - 1];
    const atrVal = lastDefined(atr(candles, 14)) || current * 0.008; // ~0.8% fallback

    const zoneWidth = atrVal * 0.7;
    const inSupportZone = current >= support && current <= support + zoneWidth;
    const inResistanceZone = current <= resistance && current >= resistance - zoneWidth;

    if (inSupportZone) {
      const dist = (current - support) / zoneWidth;
      const strength = 0.62 + (1 - dist) * 0.18; // stronger the closer to exact low
      return makeSignal(this.id, symbol, at, 'long', strength, `Price in support zone ~${support.toFixed(2)} (ATR-based)`);
    }
    if (inResistanceZone) {
      const dist = (resistance - current) / zoneWidth;
      const strength = 0.62 + (1 - dist) * 0.18;
      return makeSignal(this.id, symbol, at, 'short', strength, `Price in resistance zone ~${resistance.toFixed(2)} (ATR-based)`);
    }
    return makeSignal(this.id, symbol, at, 'neutral', 0.3, 'Price between support and resistance');
  },
};
