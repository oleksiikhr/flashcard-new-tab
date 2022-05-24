/* eslint-disable */

export function warn(...data: any[]): void {
  console.warn(...data);
}

export function error(...data: any[]): void {
  console.error(...data);
}

export default {
  warn,
  error,
};
