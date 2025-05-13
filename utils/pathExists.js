import { access } from 'node:fs/promises';

export async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    return false;
  }
}
