import { rename } from 'fs/promises';
import { parse, format } from 'path';
import { catchError } from '../utils/catchError.js';
import { getPath } from '../utils/getPath.js';
import { pathExists } from '../utils/pathExists.js';
import { extractArgs } from '../utils/extractArgs.js';

export const renameFile = (pathAndNewName) =>
  catchError(async () => {
    const { first: path, second: newName } = extractArgs(pathAndNewName);
    const fileExists = await pathExists(getPath(path));

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
