import {
  WorkerMessage,
  WorkerMessageEvent,
} from '.';

export class WorkerHelper {
  private worker: Worker;

  constructor(worker: Worker) {
    this.worker = worker;
  }

  public postMessage(
    msg: WorkerMessage,
    transferList?: ArrayBuffer[]
  ): any {
    this.worker.postMessage(JSON.stringify(msg), transferList);
  }

  public addEventListener(
    type: 'message' | 'error',
    listener: (this: WorkerHelper, ev: WorkerMessageEvent) => any,
    useCapture?: boolean
  ): void {
    this.worker.addEventListener(type, listener, useCapture);
  }

  public removeEventListener(
    type: 'message' | 'error',
    listener: (this: WorkerHelper, ev: WorkerMessageEvent) => any,
    useCapture?: boolean
  ): void {
    this.worker.removeEventListener(type, listener, useCapture);
  }

  public terminate(): void {
    this.worker.terminate();
  }
}
