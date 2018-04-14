export interface Pixel {
  r: number;
  g: number;
  b: number;
  a: number;
}

export type ConvolveAction = (pixel: Pixel) => Pixel;

export type KernalConvolveAction = (
  pixel: Pixel,
  kernel: Pixel[],
  kernelSize: number,
  weights?: number[]
) => Pixel;
