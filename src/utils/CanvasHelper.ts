import { err } from '../common';

export function getContext2D(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  if (!canvas) {
    err('IInvalid canvas');
  }

  return canvas.getContext('2d');
}

export function setCanvasByImage(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
  if (!canvas) {
    err('IInvalid canvas');
  }

  if (!image) {
    err('Invalid image');
  }

  canvas.width = image.width;
  canvas.height = image.height;
  getContext2D(canvas).drawImage(image, 0, 0);
}
