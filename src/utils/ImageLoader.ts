import {
  Cache
} from '.';

import {
  Observable,
  Observer,
} from 'rxjs';

class ImageLoader {
  public crossOrigin: string = 'Anonymous';

  private path: string;
  private cache: Cache<HTMLImageElement> = new Cache();

  public load(
    url: string,
    onLoad: (image: HTMLImageElement) => void,
    onError: (image: Event) => void
  ): Observable<HTMLImageElement> {

    const src: string = this.path ? this.path + url : url;
    const observable: Observable<HTMLImageElement> = Observable.create(
      (observer: Observer<HTMLImageElement>) => {
        if (this.cache.has(src)) {
          setTimeout(
            () => {
              observer.next(this.cache.get(src));
              observer.complete();
            },
            0);
          return;
        }
        this.loadImage(src, observer);
      }
    );

    return observable;
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
    observer: Observer<HTMLImageElement>): void {
    const image: HTMLImageElement =
      document.createElementNS('http://www.w3.org/1999/xhtml', 'img') as HTMLImageElement;
    Observable.fromEvent(image, 'load').subscribe(() => {
      this.cache.add(src, image);
      observer.next(image);
      observer.complete();
    });
    Observable.fromEvent(image, 'error').subscribe((event: Event) => {
      observer.error(event);
    });
    if (src.substr(0, 5) !== 'data:') {
      if (this.crossOrigin !== undefined) {
        image.crossOrigin = this.crossOrigin;
      }
    }
    image.src = src;
  }
}

export default ImageLoader;
