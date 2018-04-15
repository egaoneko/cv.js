import {
  MESSAGE_TYPE,
  ResultMessage,
  WorkerHelper,
  WorkerMessageEvent,
} from '.';

const helper: WorkerHelper = new WorkerHelper(self as any);

helper.addEventListener('message', (event: WorkerMessageEvent): any => {
  let message: ResultMessage;

  switch (event.data.type) {
    case MESSAGE_TYPE.READY:
      message = {
        type: MESSAGE_TYPE.RESULT,
        data: { message: 'Worker is ready' }
      } as ResultMessage;
      break;
  }

  if (!message) {
    return;
  }

  helper.postMessage(message);
});
