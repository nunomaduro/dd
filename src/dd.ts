/*eslint-disable */
import { inspect } from "eyes";
/* eslint-enable */

import { findSourceCall, createExitable } from './concerns';
import { Exitable } from './types';

export default (...args: readonly any[]): Exitable => {
  args.forEach(arg => inspect(arg, `${findSourceCall()} ${typeof arg}`));

  return createExitable();
};
