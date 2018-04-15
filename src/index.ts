import * as channel from './channel';
import * as filtering from './filtering';
import * as grayscale from './grayscale';
import { WORKER_TYPE } from './interfaces';
import * as merge from './merge';
import * as utils from './utils';
import WorkerLoader from './worker/WorkerLoader';

if (WorkerLoader.useWorker) {
  const loader: WorkerLoader = new WorkerLoader(
    WORKER_TYPE.COMMON,
    () => console.info('Common worker is loaded')
  );
}

const cvjs = {
  channel,
  filtering,
  grayscale,
  merge,
  utils,
};

global.cvjs = global.cvjs || cvjs;

console.info('cvjs is loaded');

export default cvjs;
