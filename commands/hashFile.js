import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { catchError } from '../utils/catchError.js';

export const hashFile = (path) =>
  catchError(async () => {
    const hash = createHash('sha256');
    const stream = createReadStream(path);

    await pipeline(stream, hash);
    console.log(hash.digest('hex'));
  });
