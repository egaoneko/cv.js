import * as channel from './channel';
import * as filtering from './filtering';
import * as grayscale from './grayscale';
import * as merge from './merge';
import * as utils from './utils';

const cvjs = {
  channel,
  filtering,
  grayscale,
  merge,
  utils,
};

(global as any).cvjs = (global as any).cvjs || cvjs;

export default cvjs;
