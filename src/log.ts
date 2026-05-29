// Dev-only logging helpers. `NODE_ENV` is injected by webpack's EnvironmentPlugin,
// so in production builds the `() => undefined` branch is selected and the calls
// are dead-code-eliminated by Terser. Nothing is logged in the shipped extension.
declare const process: { env: { NODE_ENV?: string } };

const isProduction = process.env.NODE_ENV === 'production';

export const debug: (...args: unknown[]) => void = isProduction
  ? () => undefined
  : // eslint-disable-next-line no-console
    console.debug;

export const logError: (...args: unknown[]) => void = isProduction
  ? () => undefined
  : // eslint-disable-next-line no-console
    console.error;
