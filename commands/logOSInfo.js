import os from 'node:os';
import util from 'node:util';
import { messages } from '../utils/messages.js';

export const logOSInfo = (arg) => {
  switch (arg) {
    case '--EOL':
      console.log(util.inspect(os.EOL));
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
      console.log(messages.invalidInput);
      console.log(messages.enterCommand);
      return;
  }

  console.log(messages.currentDir(process.cwd()));
  console.log(messages.enterCommand);
};
