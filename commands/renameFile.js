import { rename } from 'fs/promises';
import { parse, format } from 'path';
import { catchError } from '../utils/catchError.js';
import { extractArgs } from '../utils/extractArgs.js';

export const renameFile = (pathAndNewName) =>
  catchError(async () => {
    const { first: path, second: newName } = extractArgs(pathAndNewName);

    const parsedPath = parse(path);
    const { root, ext, dir } = parsedPath;

    if (!ext) {
      throw new Error();
    }

    const newPath = format({
      root,
      ext,
      dir,
      name: newName,
    });

    await rename(path, newPath);
  });
