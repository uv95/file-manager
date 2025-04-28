import { relative, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function getPath(path) {
  const relativePath = relative(__dirname, path);
  return join(__dirname, relativePath);
}
