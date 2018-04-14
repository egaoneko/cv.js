import { Pixel } from './interfaces';

export function err(msg: string): void {
  throw msg || 'Invalid input';
}

export function compPixel(a: Pixel, b: Pixel): number {
  const avgA: number = (a.r + a.g + a.b) / 3;
  const avgB: number = (b.r + b.g + b.b) / 3;
  return avgA - avgB;
}
