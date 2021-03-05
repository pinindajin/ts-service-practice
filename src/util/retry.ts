import {sleep} from './sleep';

export const retry = async (
  fn: any,
  numRetries: number,
  sleepTimeBetweenRetriesInMs: number,
  desc: string
) => {
  for (let i = 0; i < numRetries; i++) {
    try {
      if (i > 0) await sleep(sleepTimeBetweenRetriesInMs);
      console.log(`Trying <${desc}>.`);
      return await fn();
    } catch (err) {
      console.log(`Failed to do task <${desc}> retrying...`, err);
    }
  }

  throw new Error(`Failed retrying ${numRetries} times`);
};
