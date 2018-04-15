import {
  WorkerHelper
} from '.';
import { err } from '../common';
import { Cache } from '../utils';

const cache: Cache<WorkerLoader> = new Cache();

class WorkerLoader {

  public worker: Worker;
  public helper: WorkerHelper;
  public isLoaded: boolean = false;

  static get useWorker(): boolean {
    return !!global.Worker;
  }

  constructor(stringUrl: string, loaded?: (loader: WorkerLoader) => void) {
    if (!WorkerLoader.useWorker) {
      err('Do not support worker');
    }

    if (!stringUrl) {
      err('Invalid stringUrl');
    }

    if (cache.has(stringUrl)) {
      const loader: WorkerLoader = cache.get(stringUrl);
      loaded(loader);
      return loader;
    }

    fetch(stringUrl)
      .catch((reason: any) => err(reason))
      .then((data: Response) => data.blob())
      .then((blob: Blob) => {
        this.isLoaded = true;
        this.worker = new Worker(URL.createObjectURL(blob));
        this.helper = new WorkerHelper(this.worker);
        cache.add(stringUrl, this);
        loaded(this);
      });
  }
}

export default WorkerLoader;
