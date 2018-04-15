import {
  GRAYSCALE_TYPE,
} from '.';

import CVImage from '../CVImage';
import { Pixel } from '../interfaces';
import { Perf } from '../utils';

export function grayscale(image: HTMLImageElement, type: GRAYSCALE_TYPE): HTMLCanvasElement {
  const cvImage: CVImage = new CVImage(image);

  switch (type) {
    case GRAYSCALE_TYPE.AVERAGE:
      Perf.timeStart(`GRAYSCALE: ${type}`);
      cvImage.convolve(convolveByAverage);
      Perf.timeEnd(`GRAYSCALE: ${type}`);
      break;
    case GRAYSCALE_TYPE.YUV:
      Perf.timeStart(`GRAYSCALE: ${type}`);
      cvImage.convolve(convolveByYUV);
      Perf.timeEnd(`GRAYSCALE: ${type}`);
      break;
    case GRAYSCALE_TYPE.HSL:
      Perf.timeStart(`GRAYSCALE: ${type}`);
      cvImage.convolve(convolveByHSL);
      Perf.timeEnd(`GRAYSCALE: ${type}`);
      break;
    case GRAYSCALE_TYPE.HSV:
      Perf.timeStart(`GRAYSCALE: ${type}`);
      cvImage.convolve(convolveByHSV);
      Perf.timeEnd(`GRAYSCALE: ${type}`);
      break;
    case GRAYSCALE_TYPE.HSI:
      Perf.timeStart(`GRAYSCALE: ${type}`);
      cvImage.convolve(convolveByHSI);
      Perf.timeEnd(`GRAYSCALE: ${type}`);
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
