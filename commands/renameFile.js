import { rename } from 'fs/promises';
import { parse, format } from 'path';
import { catchError } from '../utils/catchError.js';
import { getPath } from '../utils/getPath.js';
import { pathExists } from '../utils/pathExists.js';

export const renameFile = (pathAndNewName) =>
  catchError(async () => {
    let path = '';
    let newName = '';
    const match = pathAndNewName.match(/^(.+\.\w+)\s+(.+)$/);

    if (match) {
      path = getPath(match[1]);
      newName = match[2];
    }

    const fileExists = await pathExists(path);

    if (!fileExists) {
      throw new Error('Operation failed');
    }

    const parsedPath = parse(path);
    const { root, ext, dir } = parsedPath;
    const newPath = format({
      root,
      ext,
      dir,
      name: newName,
    });

    await rename(path, newPath);
  });
