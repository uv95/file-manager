import { access } from 'fs/promises';

export async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    return error;
  }
}
