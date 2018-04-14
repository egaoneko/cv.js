import CVImage from '../../CVImage';
import { err } from '../../common';
import { Pixel } from '../../interfaces';
import { Perf } from '../../utils';

export function gaussian(image: HTMLImageElement, kernelSize: number, sigma: number = 0): HTMLCanvasElement {
  const cvImage: CVImage = new CVImage(image);

  Perf.timeStart(`GAUSSIAN_FILTERING`);
  cvImage.kernelConvolve(action, kernelSize, getWeights(kernelSize, sigma));
  Perf.timeEnd(`GAUSSIAN_FILTERING`);

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

export function getWeights(kernelSize: number, sigma: number): number[] {
  if (kernelSize % 2 === 0) {
    err('Invalid kernelSize');
  }

  if (sigma === 0) {
    sigma = getSigma(kernelSize);
  }

  const kernel: number[] = [];
  const origin: number = Math.floor(kernelSize >> 1);
  for (let x = 0; x < kernelSize; x++) {
    for (let y = 0; y < kernelSize; y++) {
      kernel[x * kernelSize + y] = getWeight(x, y, origin, sigma);
    }
  }

  return kernel;
}

function getSigma(kernelSize: number): number {
  return 0.3 * ((kernelSize - 1) * 0.5 - 1) + 0.8;
}

function getWeight(x: number, y: number, origin: number, sigma: number): number {
  return Math.exp(-0.5 * (Math.pow((x - origin) / sigma, 2.0) + (Math.pow((y - origin) / sigma, 2.0)))) / (2 * Math.PI * sigma * sigma);
}
