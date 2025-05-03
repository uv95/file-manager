import { readdir } from 'fs/promises';
import { catchError } from '../utils/catchError.js';

export const listFiles = () =>
  catchError(async () => {
    const fileList = await readdir(process.cwd(), { withFileTypes: true });

    const files = fileList
      .filter((file) => !file.isDirectory())
      .map((file) => ({
        Name: file.name,
        Type: 'File',
      }))
      .sort((a, b) => sortStrings(a.Name, b.Name));

    const folders = fileList
      .filter((folder) => folder.isDirectory())
      .map((folder) => ({
        Name: folder.name,
        Type: 'Directory',
      }))
      .sort((a, b) => sortStrings(a.Name, b.Name));

    console.table(folders.concat(files));
  });

function sortStrings(a, b) {
  return a.localeCompare(b, undefined, { sensitivity: 'base' });
}
