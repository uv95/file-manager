import { homedir } from 'node:os';
import { relative, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readAndPrint } from './commands/readAndPrint.js';
import { changeDirectory } from './commands/changeDirectory.js';

greetUser();

function greetUser() {
  const username = process.argv.slice(2).join('').split('=')[1];
  console.log(`Welcome to the File Manager, ${username}!`);
}
const currentWorkingDirectory = process.cwd();
const homeDirectory = homedir();

// console.log('currentWorkingDirectory', currentWorkingDirectory);
// console.log('homeDirectory', homeDirectory);

const __dirname = dirname(fileURLToPath(import.meta.url));

process.stdin.on('data', (chunk) => {
  const [commandName, ...args] = chunk.toString().split(' ');

  switch (commandName) {
    case 'cat':
      readAndPrint(...args.map((arg) => getPath(arg.trim())));
      break;

    case 'cd':
      changeDirectory(getPath(args.join(' ').trim()));
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

function getPath(path) {
  const relativePath = relative(__dirname, path);
  return join(__dirname, relativePath);
}
