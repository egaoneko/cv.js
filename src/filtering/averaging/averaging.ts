import CVImage from '../../CVImage';
import { Pixel } from '../../interfaces';
import { Perf } from '../../utils';

export function averaging(image: HTMLImageElement, blockSize: number): HTMLCanvasElement {
  const cvImage: CVImage = new CVImage(image);
  Perf.timeStart(`FILTERING_AVERAGING`);
  cvImage.kernelConvolve(action, blockSize);
  Perf.timeEnd(`FILTERING_AVERAGING`);
  return cvImage.canvas;
}

function action(pixel: Pixel, kernel: Pixel[], blockSize: number): Pixel {
  const kernelSize: number = blockSize * blockSize;
  if (kernel.length < kernelSize) {
    return pixel;
  }

  const [r, g, b, a]: number[] = kernel.reduce(
    (avgBrightnesses: number[], pixel: Pixel): number[] => {
      const { r, g, b, a } = pixel;
      const pixelBrightnesses: number[] = [r, g, b, a];
      return [0, 1, 2, 3].map(
        (idx: number): number => avgBrightnesses[idx] + pixelBrightnesses[idx] / kernelSize
      );
    },
    [0, 0, 0, 0]
  );
  
  return {
    r,
    g,
    b,
    a
  } as Pixel;
}
