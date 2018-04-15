import {
  MERGE_TYPE,
} from '.';

import CVImage from '../CVImage';
import { Pixel } from '../interfaces';
import { Perf } from '../utils';

export function merge(
  image1: HTMLImageElement,
  image2: HTMLImageElement,
  type: MERGE_TYPE,
  weight1?: number,
  weight2?: number
): HTMLCanvasElement {
  const cvImage1: CVImage = new CVImage(image1);
  const cvImage2: CVImage = new CVImage(image2);

  switch (type) {
    case MERGE_TYPE.REMAINDER:
      Perf.timeStart(`MERGE_TYPE: ${type}`);
      cvImage1.multiConvolve(cvImage2, remainderMerge);
      Perf.timeEnd(`MERGE_TYPE: ${type}`);
      break;
    case MERGE_TYPE.MIN:
      Perf.timeStart(`MERGE_TYPE: ${type}`);
      cvImage1.multiConvolve(cvImage2, minMerge);
      Perf.timeEnd(`MERGE_TYPE: ${type}`);
      break;
    case MERGE_TYPE.WEIGHT:
      Perf.timeStart(`MERGE_TYPE: ${type}`);
      cvImage1.multiConvolve(cvImage2, weightMerge, weight1, weight2);
      Perf.timeEnd(`MERGE_TYPE: ${type}`);
      break;
    default:
      break;
  }
  return cvImage1.canvas;
}

function remainderMerge(pixel1: Pixel, pixel2: Pixel): Pixel {
  if (!pixel2) {
    return pixel1;
  }

  return {
    a: pixel1.a,
    r: (pixel1.r + pixel2.r) % 256,
    g: (pixel1.g + pixel2.g) % 256,
    b: (pixel1.b + pixel2.b) % 256
  } as Pixel;
}

function minMerge(pixel1: Pixel, pixel2: Pixel): Pixel {
  if (!pixel2) {
    return pixel1;
  }

  return {
    a: pixel1.a,
    r: Math.min(pixel1.r + pixel2.r, 255),
    g: Math.min(pixel1.g + pixel2.g, 255),
    b: Math.min(pixel1.b + pixel2.b, 255)
  } as Pixel;
}

function weightMerge(
  pixel1: Pixel,
  pixel2: Pixel,
  weight1: number,
  weight2: number
): Pixel {
  if (!pixel2) {
    return pixel1;
  }

  return {
    a: pixel1.a,
    r: Math.min(weight1 * pixel1.r + weight2 * pixel2.r, 255),
    g: Math.min(weight1 * pixel1.g + weight2 * pixel2.g, 255),
    b: Math.min(weight1 * pixel1.b + weight2 * pixel2.b, 255)
  } as Pixel;
}
