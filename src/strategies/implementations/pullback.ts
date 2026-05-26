import type { Strategy } from '../strategy.js';
import { closes, lastCandle } from '../../domain/candle.js';
import { neutral } from '../../domain/signal.js';
import { atr, lastDefined, sma } from '../indicators.js';
import { makeSignal } from '../helpers.js';

/**
 * Pullback: in an established trend (price vs SMA-20), enter on a volatility-adjusted
 * retracement (0.7\u20132.8 ATR from recent swing high/low). This replaces the old
 * hard-coded 1.5% which failed across different volatility regimes.
 */
export const pullback: Strategy = {
  id: 'pullback',
  title: 'Pullback',
  minCandles: 25,

  evaluate(candles, symbol, _params) {
    const at = lastCandle(candles)?.openTime ?? Date.now();
    if (candles.length < this.minCandles) return neutral(this.id, symbol, at, 'Not enough data');

    const price = closes(candles);
    const current = price[price.length - 1];
    const smaValue = lastDefined(sma(price, 20));
    const atrVal = lastDefined(atr(candles, 14)) || current * 0.01;
    const window = candles.slice(-12);

    if (current > smaValue) {
      const recentHigh = Math.max(...window.map((c) => c.high));
      const retracement = recentHigh - current;
      if (retracement >= atrVal * 0.7 && retracement <= atrVal * 2.8) {
        return makeSignal(this.id, symbol, at, 'long', 0.72, 'ATR-adjusted pullback in uptrend \u2014 entry zone');
      }
    } else if (current < smaValue) {
      const recentLow = Math.min(...window.map((c) => c.low));
      const retracement = current - recentLow;
      if (retracement >= atrVal * 0.7 && retracement <= atrVal * 2.8) {
        return makeSignal(this.id, symbol, at, 'short', 0.72, 'ATR-adjusted pullback in downtrend \u2014 entry zone');
      }
    }
    return makeSignal(this.id, symbol, at, 'neutral', 0.35, 'No clean pullback setup');
  },
};
