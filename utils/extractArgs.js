export function extractArgs(argsString) {
  const args = {};
  const match = argsString.match(/^(.+\.\w+)\s+(.+)$/);

  if (!match) {
    throw new Error('Operation failed\n');
  }

  args.first = match[1];
  args.second = match[2];

  return args;
}
