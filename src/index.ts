import * as grayscale from './grayscale';
import * as channel from './channel';
import * as utils from './utils';

const cvjs = {
  utils,
  grayscale,
  channel,
};

(global as any).cvjs = (global as any).cvjs || cvjs;

export default cvjs;
