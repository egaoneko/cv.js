import {
  CHANNEL_PRESENT_FLAG,
  CHANNEL_TYPE,
} from './index';

import { err } from '../common';
import CVImage from '../CVImage';
import { Pixel } from '../interfaces';
import { Perf } from '../utils';

export function channel(image: HTMLImageElement,
                        type: CHANNEL_TYPE,
                        presentFlag: CHANNEL_PRESENT_FLAG): HTMLCanvasElement {
  const cvImage: CVImage = new CVImage(image);
  Perf.timeStart(`CHANNEL: ${type}, ${presentFlag}`);
  cvImage.convolve(splitChannel(type, presentFlag));
  Perf.timeEnd(`CHANNEL: ${type}, ${presentFlag}`);
  return cvImage.canvas;
}

function splitChannel(type: CHANNEL_TYPE,
                      presentFlag: CHANNEL_PRESENT_FLAG): (pixel: Pixel) => Pixel {
  return (pixel: Pixel): Pixel => {
    const brightness: number = getChannelBrightness(type, pixel);
    const a: number = pixel.a;
    let r: number;
    let g: number;
    let b: number;

    if (CHANNEL_PRESENT_FLAG.SINGLE === presentFlag) {
      // red
      r = type === CHANNEL_TYPE.RED ? brightness : 0;
      // green
      g = type === CHANNEL_TYPE.GREEN ? brightness : 0;
      // blue
      b = type === CHANNEL_TYPE.BLUE ? brightness : 0;
    } else {
      // red
      r = brightness;
      // green
      g = brightness;
      // blue
      b = brightness;
    }

    return {
      r,
      g,
      b,
      a
    };
  };
}

function getChannelBrightness(type: CHANNEL_TYPE, { r, g, b, a }: Pixel): number {
  switch (type) {
    case CHANNEL_TYPE.RED:
      return r;
    case CHANNEL_TYPE.GREEN:
      return g;
    case CHANNEL_TYPE.BLUE:
      return b;
    default:
      err('Invalid channel');
  }
}
