// https://github.com/webpack-contrib/worker-loader/issues/94

// Enumerate message types
export const enum MESSAGE_TYPE {
  READY = 'ready',
  REQUEST = 'request',
  RESULT = 'result',
  ERROR = 'error'
}

// Enumerate method types
export const enum METHOD_TYPE {
  CONVOLVE = 0,
}

// Define expected properties for each message type
export interface ReadyMessage {
  type: MESSAGE_TYPE.READY;
}

export interface RequestMessage {
  type: MESSAGE_TYPE.REQUEST;
  method?: METHOD_TYPE;
  data: RequestMessageData;
}

export interface RequestMessageData {
  message?: string;
}

export interface ResultMessage {
  type: MESSAGE_TYPE.RESULT;
  method?: METHOD_TYPE;
  data: ResultMessageData;
}

export interface ResultMessageData {
  message?: string;
}

export interface ErrorMessage {
  type: MESSAGE_TYPE.ERROR;
  error: string;
}

// Create a union type of all messages for convenience
export type WorkerMessage = ReadyMessage | RequestMessage | ResultMessage | ErrorMessage;

// Extend MessageEvent to use our messages
export interface WorkerMessageEvent extends MessageEvent {
  data: WorkerMessage;
}
