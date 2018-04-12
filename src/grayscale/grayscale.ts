import {
  GRAYSCALE_TYPE,
} from './index';

import CVImage from '../CVImage';
import { Pixel } from '../interfaces';
import { Perf } from '../utils';

export function grayscale(image: HTMLImageElement, flag: GRAYSCALE_TYPE): HTMLCanvasElement {
  const cvImage: CVImage = new CVImage(image);

  switch (flag) {
    case GRAYSCALE_TYPE.AVERAGE:
      Perf.timeStart('GRAYSCALE_TYPE.AVERAGE');
      cvImage.convolve(convolveByAverage);
      Perf.timeEnd('GRAYSCALE_TYPE.AVERAGE');
      break;
    case GRAYSCALE_TYPE.YUV:
      Perf.timeStart('GRAYSCALE_TYPE.YUV');
      cvImage.convolve(convolveByYUV);
      Perf.timeEnd('GRAYSCALE_TYPE.YUV');
      break;
    case GRAYSCALE_TYPE.HSL:
      Perf.timeStart('GRAYSCALE_TYPE.HSL');
      cvImage.convolve(convolveByHSL);
      Perf.timeEnd('GRAYSCALE_TYPE.HSL');
      break;
    case GRAYSCALE_TYPE.HSV:
      Perf.timeStart('GRAYSCALE_TYPE.HSV');
      cvImage.convolve(convolveByHSV);
      Perf.timeEnd('GRAYSCALE_TYPE.HSV');
      break;
    case GRAYSCALE_TYPE.HSI:
      Perf.timeStart('GRAYSCALE_TYPE.HSI');
      cvImage.convolve(convolveByHSI);
      Perf.timeEnd('GRAYSCALE_TYPE.HSI');
      break;
    default:
      break;
  }
  return cvImage.canvas;
}

function convolveByAverage({ r, g, b, a }: Pixel): Pixel {
  const brightness: number = (r + g + b) / 3;
  return {
    a,
    r: brightness,
    g: brightness,
    b: brightness
  } as Pixel;
}

function convolveByYUV({ r, g, b, a }: Pixel): Pixel {
  const brightness: number = r * 0.2126 + g * 0.7152 + b * 0.0722;
  return {
    a,
    r: brightness,
    g: brightness,
    b: brightness
  } as Pixel;
}

function convolveByHSL({ r, g, b, a }: Pixel): Pixel {
  const brightness: number = (Math.max(r, g, b) + Math.min(r, g, b)) * 0.5;
  return {
    a,
    r: brightness,
    g: brightness,
    b: brightness
  } as Pixel;
}

function convolveByHSV({ r, g, b, a }: Pixel): Pixel {
  const brightness: number = Math.max(r, g, b);
  return {
    a,
    r: brightness,
    g: brightness,
    b: brightness
  } as Pixel;
}

function convolveByHSI({ r, g, b, a }: Pixel): Pixel {
  const brightness: number = (r + g + b) / 3;
  return {
    a,
    r: brightness,
    g: brightness,
    b: brightness
  } as Pixel;
}
