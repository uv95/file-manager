import { rename } from 'fs/promises';
import { parse, format } from 'path';
import { catchError } from '../utils/catchError.js';
import { getPath } from '../utils/getPath.js';

export const renameFile = (pathAndNewName) =>
  catchError(async () => {
    let path = '';
    let newName = '';
    const match = pathAndNewName.match(/^(.+\.\w+)\s+(.+)$/);

    if (match) {
      path = match[1];
      newName = match[2];
    }

    const parsedPath = parse(getPath(path));
    const { root, ext, dir } = parsedPath;
    const newPath = format({
      root,
      ext,
      dir,
      name: newName,
    });

    await rename(path, newPath);
  });
