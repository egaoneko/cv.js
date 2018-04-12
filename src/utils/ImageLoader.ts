import {
  Cache
} from '../utils';

class ImageLoader {
  public crossOrigin: string = 'Anonymous';

  private path: string;
  private cache: Cache<HTMLImageElement> = new Cache<HTMLImageElement>();

  public load(
    url: string,
    onLoad: (image: HTMLImageElement) => void,
    onError: (image: Event) => void): HTMLImageElement {

    const src: string = this.path ? this.path + url : url;

    if (this.cache.has(src)) {
      setTimeout(
        () => {
          if (onLoad) {
            onLoad(this.cache.get(src));
          }
        },
        0);
      return this.cache.get(src);
    }

    return this.loadImage(src, onLoad, onError);
  }

  public setCrossOrigin(value: string): ImageLoader {
    this.crossOrigin = value;
    return this;
  }

  public setPath(value: string): ImageLoader {
    this.path = value;
    return this;
  }

  private loadImage(
    src: string,
    onLoad: (image: HTMLImageElement) => void,
    onError: (image: Event) => void): HTMLImageElement {
    const image: HTMLImageElement =
      document.createElementNS('http://www.w3.org/1999/xhtml', 'img') as HTMLImageElement;
    image.addEventListener('load', () => {
      this.cache.add(src, image);
      if (onLoad) {
        onLoad(image);
      }
    });
    image.addEventListener('error', (event: Event) => {
      if (onError) {
        onError(event);
      }
    });
    if (src.substr(0, 5) !== 'data:') {
      if (this.crossOrigin !== undefined) {
        image.crossOrigin = this.crossOrigin;
      }
    }
    image.src = src;
    return image;
  }
}

export default ImageLoader;
