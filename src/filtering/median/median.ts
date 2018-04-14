import {
  compPixel,
  err
} from '../../common';
import CVImage from '../../CVImage';
import * as grayscale from '../../grayscale';
import { Pixel } from '../../interfaces';
import { Perf } from '../../utils';

export function median(image: HTMLImageElement, kernelSize: number): HTMLCanvasElement {
  const cvImage: CVImage = new CVImage(image);

  Perf.timeStart(`MEDIAN_FILTERING`);
  cvImage.kernelConvolve(action, kernelSize);
  Perf.timeEnd(`MEDIAN_FILTERING`);

  return cvImage.canvas;
}

function action(pixel: Pixel, kernel: Pixel[], kernelSize: number): Pixel {
  kernel.sort(compPixel);
  return kernel[Math.floor(kernel.length >> 1)];
}
