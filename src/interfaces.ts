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

export type MergeConvolveAction = (
  pixel1: Pixel,
  pixel2: Pixel,
  weight1?: number,
  weight2?: number
) => Pixel;

export enum WORKER_TYPE {
  COMMON = '/build/worker.js'
}
