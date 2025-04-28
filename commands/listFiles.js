import { readdir } from 'fs/promises';
import { catchError } from '../utils/catchError.js';

export const listFiles = () =>
  catchError(async () => {
    const files = await readdir(process.cwd(), { withFileTypes: true });

    const table = files.map((file) => ({
      Name: file.name,
      Type: file.isDirectory() ? 'Directory' : 'File',
    }));

    console.table(table);
  });
