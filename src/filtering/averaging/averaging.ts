import CVImage from '../../CVImage';
import { err } from '../../common';
import { Pixel } from '../../interfaces';
import { Perf } from '../../utils';

export function averaging(image: HTMLImageElement, kernelSize: number): HTMLCanvasElement {
  const cvImage: CVImage = new CVImage(image);

  Perf.timeStart(`AVERAGING_FILTERING`);
  cvImage.kernelConvolve(action, kernelSize, getWeights(kernelSize));
  Perf.timeEnd(`AVERAGING_FILTERING`);

  return cvImage.canvas;
}

function action(pixel: Pixel, kernel: Pixel[], kernelSize: number, weights: number[]): Pixel {
  const [r, g, b]: number[] = kernel.reduce(
    (avgBrightnesses: number[], pixel: Pixel, cIdx: number): number[] => {
      const { r, g, b } = pixel;
      const pixelBrightnesses: number[] = [r, g, b];
      return [0, 1, 2].map(
        (idx: number): number => avgBrightnesses[idx] + pixelBrightnesses[idx] * weights[cIdx]
      );
    },
    [0, 0, 0]
  );

  return {
    r,
    g,
    b,
    a: pixel.a
  } as Pixel;
}

export function getWeights(kernelSize: number): number[] {
  if (kernelSize % 2 === 0) {
    err('Invalid kernelSize');
  }

  const kSize: number = kernelSize * kernelSize;
  return [...Array(kSize)].fill(1 / kSize);
}
