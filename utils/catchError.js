import { messages } from './messages.js';

export const catchError = async (fn) => {
  try {
    await fn();
    console.log(messages.currentDir(process.cwd()));
  } catch (error) {
    console.error(messages.error);
  }
};
