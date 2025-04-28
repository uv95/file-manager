import { catchError } from '../utils/catchError.js';
import os from 'os';

export const logOSInfo = (arg) =>
  catchError(async () => {
    switch (arg) {
      case '--EOL':
        console.log(os.EOL);
        break;
      case '--cpus':
        const cpus = os.cpus();
        console.log(
          `CPUS Total: ${cpus.length}.\n${cpus
            .map((cpu) => cpu.model)
            .join('\n')}`
        );
        break;
      case '--homedir':
        console.log(os.homedir());
        break;
      case '--username':
        console.log(os.userInfo().username);
        break;
      case '--architecture':
        console.log(os.arch());
        break;

      default:
        throw new Error('Operation failed\n');
    }
  });
