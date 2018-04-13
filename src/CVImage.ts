import {
  getContext2D,
  setCanvasByImage,
} from './utils/CanvasHelper';
import { err } from './common';
import { Pixel } from './interfaces';

type Channel = 0 | 1 | 2 | 3;

class CVImage {

  public get image(): HTMLImageElement {
    return this._image;
  }

  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  private _image: HTMLImageElement;
  private _canvas: HTMLCanvasElement = document.createElement('canvas');
  private ctx: CanvasRenderingContext2D = getContext2D(this._canvas);
  private imageData: ImageData;

  private get width(): number {
    return this._canvas.width;
  }

  private get height(): number {
    return this._canvas.height;
  }

  constructor(image: HTMLImageElement) {
    if (!image) {
      err('Invalid image');
    }

    this._image = image;
    setCanvasByImage(this._canvas, image);
    this.imageData = this.ctx.getImageData(0, 0, this.width, this.height);
  }

  public convolve(action: (pixel: Pixel) => Pixel): HTMLImageElement {
    const pixels: Uint8ClampedArray = this.getPixels();

    for (let idx = 0; idx < pixels.length; idx += 4) {
      const { r, g, b, a } = action(this.getPixelByIndex(pixels, idx));

      // red
      pixels[idx] = r;
      // green
      pixels[idx + 1] = g;
      // blue
      pixels[idx + 2] = b;
      // alpha
      pixels[idx + 3] = a;
    }

    this.setPixels(pixels);
    return this._image;
  }

  public kernelConvolve(action: (pixel: Pixel, kernel: Pixel[], blockSize: number) => Pixel,
                                 blockSize: number): HTMLImageElement {
    const pixels: Uint8ClampedArray = this.getPixels();

    if (blockSize % 2 === 0) {
      err('Invalid blockSize');
    }

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const idx: number = this.getPixelIndex(this.width, x, y, 0);
        const pixel: Pixel = this.getPixelByIndex(pixels, idx);
        const kernel: Pixel[] = this.getKernel(pixels, blockSize, x, y);
        const { r, g, b, a } = action(pixel, kernel, blockSize);

        // red
        pixels[idx] = r;
        // green
        pixels[idx + 1] = g;
        // blue
        pixels[idx + 2] = b;
        // alpha
        pixels[idx + 3] = a;
      }
    }

    this.setPixels(pixels);
    return this._image;
  }

  private getPixels(): Uint8ClampedArray {
    return this.imageData.data.slice();
  }

  private getPixelByIndex(pixels: Uint8ClampedArray, index: number): Pixel {
    return {
      r: pixels[index],
      g: pixels[index + 1],
      b: pixels[index + 2],
      a: pixels[index + 3],
    } as Pixel;
  }

  private setPixels(pixels: Uint8ClampedArray): void {
    const imageData: ImageData = this.ctx.createImageData(this.width, this.height);
    imageData.data.set(pixels);
    this.ctx.putImageData(imageData, 0, 0);

    const image = new Image();
    image.src = this._canvas.toDataURL();
    this._image = image;
  }

  private getPixelIndex(width: number, x: number, y: number, channel: Channel) {
    return (y * width + x) * 4 + channel;
  }

  private getKernel(pixels: Uint8ClampedArray, blockSize: number, x: number, y: number): Pixel[] {
    const kernel: Pixel[] = [];
    const offset: number = Math.floor(blockSize >> 2);
    const start: number = -offset;
    const end: number = blockSize - offset;

    for (var i = start; i < end; i++) {
      for (var j = start; j < end; j++) {
        if (x + i < 0 ||
          y + j < 0 ||
          x + i > this.width ||
          y + j > this.height) {
          continue;
        }
        const idx = this.getPixelIndex(this.width, x + i, y + j, 0);
        kernel.push(this.getPixelByIndex(pixels, idx));
      }
    }

    return kernel;
  }
}

export default CVImage;
