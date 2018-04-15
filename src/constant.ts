import { WORKER_TYPE } from './interfaces';
import WorkerLoader from './worker/WorkerLoader';

export const COMMON_WORKER: WorkerLoader = WorkerLoader.useWorker ? new WorkerLoader(
  WORKER_TYPE.COMMON,
  () => console.info('Common worker is loaded')
) : null;
