import { homedir } from 'node:os';
import { readAndPrint } from './commands/readAndPrint.js';
import { changeDirectory } from './commands/changeDirectory.js';
import { createDirectory } from './commands/createDirectory.js';
import { getPath } from './utils/getPath.js';
import { renameFile } from './commands/renameFile.js';
import { createFile } from './commands/createFile.js';
import { copyFile } from './commands/copyFile.js';

greetUser();

function greetUser() {
  const username = process.argv.slice(2).join('').split('=')[1];
  console.log(`Welcome to the File Manager, ${username}!`);
}
const currentWorkingDirectory = process.cwd();
const homeDirectory = homedir();

// console.log('currentWorkingDirectory', currentWorkingDirectory);
// console.log('homeDirectory', homeDirectory);

process.stdin.on('data', (chunk) => {
  const [commandName, ...args] = chunk.toString().split(' ');
  const argsString = args.join(' ').trim();

  switch (commandName) {
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

    default:
      console.log('Operation failed\n');
      break;
  }
});

process.on('SIGINT', () => {
  console.log('\nGoodbye!');
  process.exit();
});
