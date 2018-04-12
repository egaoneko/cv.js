import {
  getContext2D,
  setCanvasByImage,
} from './utils/CanvasHelper';
import { err } from './common';
import { Pixel } from './interfaces';

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

  public convolve(action:(pixel: Pixel) => Pixel): HTMLImageElement {
    const pixels: Uint8ClampedArray = this.getPixels();

    for (let idx = 0; idx < pixels.length; idx += 4) {
      const {r, g, b, a} = action({
        r: pixels[idx],
        g: pixels[idx + 1],
        b: pixels[idx + 2],
        a: pixels[idx + 3],
      } as Pixel);

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

  private getPixels(): Uint8ClampedArray {
    return this.imageData.data;
    // return this.imageData.data.slice();
  }

  private setPixels(pixels: Uint8ClampedArray): void {
    // var imageData: ImageData = this.ctx.createImageData(this.width, this.height);
    // imageData.data.set(pixels);
    // this.ctx.putImageData(imageData, 0, 0);
    this.ctx.putImageData(this.imageData, 0, 0);

    const image = new Image();
    image.src = this._canvas.toDataURL();
    this._image = image;
  }
}

export default CVImage;
