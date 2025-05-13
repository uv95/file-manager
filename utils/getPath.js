import { relative, resolve } from 'node:path';

export function getPath(path) {
  const relativePath = relative(process.cwd(), path);
  return resolve(process.cwd(), relativePath);
}
