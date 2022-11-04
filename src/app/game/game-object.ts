import { Drawable } from './drawable';
import { Boundable, Rectangle } from './boundable';

export class GameObject implements Boundable, Drawable {
  protected x: number;
  protected y: number;
  protected w: number;
  protected h: number;
  protected bounds: Rectangle;
  private image: HTMLImageElement;

  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    image: HTMLImageElement
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.bounds = { x, y, w, h };
    this.image = image;
  }

  getBounds(): Rectangle {
    return this.bounds;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    ctx.restore();
  }
}
