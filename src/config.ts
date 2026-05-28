/** Runtime configuration, resolved from environment variables with sane defaults. */
export interface TradefastConfig {
  symbols: string[];
  interval: string;
  candleLimit: number;
  accountBalance: number;
  model: string;
  theme: string;
  exchange: string;
  mode: string;
  searchingLevel: string;
  searchingPlatforms: string[];
  apiEnabled: boolean;
  apiHost: string;
  apiPort: number;
}

const DEFAULT_SYMBOLS = [
  'BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'XRPUSDT', 'ADAUSDT',
  'DOGEUSDT', 'BNBUSDT', 'AVAXUSDT', 'DOTUSDT', 'LINKUSDT',
  'LTCUSDT', 'NEARUSDT', 'APTUSDT', 'ARBUSDT', 'SUIUSDT',
  'TONUSDT', 'PEPEUSDT', 'TRXUSDT', 'ATOMUSDT', 'FILUSDT',
  'HBARUSDT', 'ALGOUSDT', 'VETUSDT', 'XLMUSDT', 'ETCUSDT',
  'AAVEUSDT', 'ICPUSDT', 'INJUSDT', 'RUNEUSDT', 'OPUSDT',
  'FETUSDT', 'KASUSDT',
];

function envFlag(name: string, fallback: boolean): boolean {
  const value = process.env[name];
  if (value == null) return fallback;
  return !['0', 'false', 'off', 'no'].includes(value.trim().toLowerCase());
}

export function loadConfig(overrides: Partial<TradefastConfig> = {}): TradefastConfig {
  const symbols = (process.env.TRADEFAST_SYMBOLS ?? '')
    .split(',')
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);

  return {
    symbols: overrides.symbols ?? (symbols.length > 0 ? symbols : DEFAULT_SYMBOLS),
    interval: overrides.interval ?? process.env.TRADEFAST_INTERVAL ?? '1h',
    candleLimit: overrides.candleLimit ?? Number(process.env.TRADEFAST_CANDLE_LIMIT ?? 200),
    accountBalance: overrides.accountBalance ?? Number(process.env.TRADEFAST_ACCOUNT_BALANCE ?? 10_000),
    model: overrides.model ?? process.env.TRADEFAST_AI_MODEL ?? 'claude-opus-4-7',
    theme: overrides.theme ?? process.env.TRADEFAST_THEME ?? 'violet',
    exchange: overrides.exchange ?? process.env.TRADEFAST_EXCHANGE ?? 'bybit',
    mode: overrides.mode ?? process.env.TRADEFAST_MODE ?? 'medium-term',
    searchingLevel: overrides.searchingLevel ?? process.env.TRADEFAST_SEARCHING_LEVEL ?? 'normal',
    searchingPlatforms: overrides.searchingPlatforms ?? (
      process.env.TRADEFAST_SEARCHING_PLATFORMS
        ? process.env.TRADEFAST_SEARCHING_PLATFORMS.split(',').map(s => s.trim()).filter(Boolean)
        : ['economic-calendars', 'news-portals', 'reddit-communities', 'exchange-communities']
    ),
    apiEnabled: overrides.apiEnabled ?? envFlag('TRADEFAST_API', true),
    apiHost: overrides.apiHost ?? process.env.TRADEFAST_API_HOST ?? '127.0.0.1',
    apiPort: overrides.apiPort ?? Number(process.env.TRADEFAST_API_PORT ?? 0),
  };
}
