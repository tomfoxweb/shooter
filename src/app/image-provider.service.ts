import { Injectable } from '@angular/core';
import { DrawableType } from './game/drawable';

interface TypeImage {
  type: DrawableType;
  image: HTMLImageElement;
}

interface ImageData {
  url: string;
  image?: HTMLImageElement;
}

@Injectable({
  providedIn: 'root',
})
export class ImageProviderService {
  private images: Map<DrawableType, ImageData>;

  constructor() {
    this.images = new Map([
      [DrawableType.Player, { url: 'assets/images/player.png' }],
      [DrawableType.Missle, { url: 'assets/images/missle.png' }],
      [DrawableType.Enemy, { url: 'assets/images/enemy.png' }],
    ]);
  }

  async loadImages() {
    const typeImagesPromises: Promise<TypeImage>[] = [];
    this.images.forEach(async (x, drawableType) => {
      typeImagesPromises.push(
        new Promise<TypeImage>(async (resolve) => {
          const image = await this.loadImage(x.url);
          const typeImage = { type: drawableType, image: image };
          resolve(typeImage);
        })
      );
    });
    const typeImages = await Promise.all(typeImagesPromises);
    typeImages.forEach((x) => {
      const data = this.images.get(x.type)!;
      data.image = x.image;
    });
  }

  getImage(type: DrawableType): HTMLImageElement {
    const data = this.images.get(type)!;
    return data.image!;
  }

  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve) => {
      const image = new Image();
      image.src = url;
      image.addEventListener('load', () => {
        resolve(image);
      });
    });
  }
}
