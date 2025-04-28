import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress } from 'zlib';
import { catchError } from '../utils/catchError.js';
import { extractArgs } from '../utils/extractArgs.js';
import { getPath } from '../utils/getPath.js';
import { pathExists } from '../utils/pathExists.js';
import { parse } from 'path';

export const compressFile = (paths) =>
  catchError(async () => {
    const { first: pathToFile, second: pathToDestination } = extractArgs(paths);
    const pathToFileExists = await pathExists(getPath(pathToFile));
    const pathToDestinationExists = await pathExists(
      getPath(pathToDestination)
    );
    const isPathToDestinationCorrect = parse(pathToDestination).ext === '.br';

    if (
      !pathToFileExists ||
      pathToDestinationExists ||
      !isPathToDestinationCorrect
    ) {
      throw new Error('Operation failed\n');
    }

    const readStream = createReadStream(pathToFile);
    const brotliCompress = createBrotliCompress();
    const writeStream = createWriteStream(pathToDestination);

    await pipeline(readStream, brotliCompress, writeStream);
  });
