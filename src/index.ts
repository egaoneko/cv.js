import * as grayscale from './grayscale';
import * as utils from './utils';

const cvjs = {
  utils,
  grayscale,
};

(global as any).cvjs = (global as any).cvjs || cvjs;

export default cvjs;
