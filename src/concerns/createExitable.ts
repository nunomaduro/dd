import { Exitable } from '../types';

export function createExitable(): Exitable {
  return {
    exit(): void {
      throw new Error('Exit was called in dd function.');
    },
  };
}
