/* eslint-disable */

export function log(...data: any[]): void {
  console.log(...data);
}

export function warn(...data: any[]): void {
  console.warn(...data);
}

export function error(...data: any[]): void {
  console.error(...data);
}

export default {
  log,
  warn,
  error,
};
