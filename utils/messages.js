export const messages = {
  goodbye: (username) =>
    `\n\x1b[34mThank you for using File Manager, \x1b[33m${username}\x1b[34m, goodbye!\x1b[0m`,
  greeting: (username) =>
    `\x1b[34mWelcome to the File Manager, \x1b[33m${username}\x1b[34m!\x1b[0m`,
  invalidInput: '\x1b[35mInvalid input!\x1b[0m',
  error: '\x1b[31mOperation failed!\x1b[0m',
  currentDir: (currentDir) =>
    `\x1b[36mYou are currently in \x1b[33m${currentDir}\x1b[0m`,
  enterCommand: '\n\x1b[34mEnter command:\x1b[0m',
};
