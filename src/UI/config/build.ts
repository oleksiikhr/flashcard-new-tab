export function resolvePath(path: string): string {
  return `/dist/${path}`;
}

export default {
  resolvePath,
};
