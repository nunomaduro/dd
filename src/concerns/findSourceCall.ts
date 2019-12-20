import path from 'path';

export function findSourceCall(): string {
  const stackTrace = new Error().stack as string;
  const source = stackTrace.split(/\r\n|\n/)[5];

  const stackFrames = source.match(/\(([^)]+)\)/);

  if (stackFrames === null) {
    return '';
  }

  return stackFrames[1].replace(process.cwd() + path.sep, '');
}
