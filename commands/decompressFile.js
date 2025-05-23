import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createBrotliDecompress } from 'node:zlib';
import { catchError } from '../utils/catchError.js';
import { extractArgs } from '../utils/extractArgs.js';
import { getPath } from '../utils/getPath.js';
import { pathExists } from '../utils/pathExists.js';
import { parse } from 'node:path';

export const decompressFile = (paths) =>
  catchError(async () => {
    const { first: pathToFile, second: pathToDestination } = extractArgs(paths);

    const pathToFileExists = await pathExists(getPath(pathToFile));
    const pathToDestinationExists = await pathExists(
      getPath(pathToDestination)
    );

    const isPathToFileCorrect = parse(pathToFile).ext === '.br';

    if (!pathToFileExists || pathToDestinationExists || !isPathToFileCorrect) {
      throw new Error();
    }

    const readStream = createReadStream(pathToFile);
    const brotliDecompress = createBrotliDecompress();
    const writeStream = createWriteStream(pathToDestination);

    await pipeline(readStream, brotliDecompress, writeStream);
  });
