import { homedir } from 'node:os';
import { readAndPrint } from './commands/readAndPrint.js';
import { changeDirectory } from './commands/changeDirectory.js';
import { createDirectory } from './commands/createDirectory.js';
import { getPath } from './utils/getPath.js';
import { renameFile } from './commands/renameFile.js';
import { createFile } from './commands/createFile.js';
import { copyFile } from './commands/copyFile.js';
import { deleteFile } from './commands/deleteFile.js';
import { moveFile } from './commands/moveFile.js';
import { listFiles } from './commands/listFiles.js';
import { logOSInfo } from './commands/logOSInfo.js';
import { hashFile } from './commands/hashFile.js';
import { compressFile } from './commands/compressFile.js';
import { decompressFile } from './commands/decompressFile.js';
import { goUp } from './commands/goUp.js';

greetUser();

function greetUser() {
  const username = process.argv.slice(2).join('').split('=')[1];
  console.log(`Welcome to the File Manager, ${username}!`);
}

const homeDirectory = homedir();
process.chdir(homeDirectory);

process.stdin.on('data', (chunk) => {
  const [commandName, ...args] = chunk.toString().split(' ');
  const argsString = args.join(' ').trim();

  if (!argsString.length) {
    switch (commandName.trim()) {
      case 'up':
        goUp();
        break;

      case 'ls':
        listFiles();
        break;

      default:
        console.log('Operation failed\n');
        break;
    }

    return;
  }

  switch (commandName.trim()) {
    case 'cat':
      readAndPrint(...args.map((arg) => getPath(arg)));
      break;

    case 'add':
      createFile(getPath(argsString));
      break;

    case 'cd':
      changeDirectory(getPath(argsString));
      break;

    case 'mkdir':
      createDirectory(getPath(argsString));
      break;

    case 'rn':
      renameFile(argsString);
      break;

    case 'cp':
      copyFile(argsString);
      break;

    case 'mv':
      moveFile(argsString);
      break;

    case 'rm':
      deleteFile(argsString);
      break;

    case 'os':
      logOSInfo(argsString);
      break;

    case 'hash':
      hashFile(getPath(argsString));
      break;

    case 'compress':
      compressFile(argsString);
      break;

    case 'decompress':
      decompressFile(argsString);
      break;

    default:
      console.log('Operation failed\n');
      break;
  }
});

process.on('SIGINT', () => {
  console.log('\nGoodbye!');
  process.exit();
});
