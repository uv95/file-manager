import { pathExists } from '../utils/pathExists.js';
import { catchError } from '../utils/catchError.js';
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

export const readAndPrint = (path) =>
  catchError(async () => {
    const fileExists = await pathExists(path);

    if (!fileExists) {
      throw new Error();
    }

    const stream = createReadStream(path);
    await pipeline(stream, process.stdout, { end: false });
  });
