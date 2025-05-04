import { createReadStream, createWriteStream } from 'node:fs';
import { catchError } from '../utils/catchError.js';
import { pathExists } from '../utils/pathExists.js';
import { pipeline } from 'node:stream/promises';
import { extractArgs } from '../utils/extractArgs.js';
import { getPath } from '../utils/getPath.js';
import { join, parse } from 'node:path';

export const copyFile = (paths) =>
  catchError(async () => {
    const { first: pathToFile, second: pathToNewDirectory } =
      extractArgs(paths);

    const srcPath = getPath(pathToFile);
    const fileName = parse(srcPath).base;
    const targetPath = join(pathToNewDirectory, fileName);

    const srcPathExists = await pathExists(srcPath);
    const targetPathExists = await pathExists(targetPath);

    if (!srcPathExists || targetPathExists) {
      throw new Error();
    }

    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(targetPath);

    await pipeline(readStream, writeStream, { end: false });
  });
