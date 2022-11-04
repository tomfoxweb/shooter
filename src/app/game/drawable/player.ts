import { Rectangle } from '../core/boundable';
import { PlayerShip } from '../core/player-ship';
import { Drawable } from './drawable';

export class Player extends PlayerShip implements Drawable {
  private width: number;
  private height: number;
  private y: number;
  private image: HTMLImageElement;
  private bounds: Rectangle;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    image: HTMLImageElement
  ) {
    super(x);
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.bounds = { x: x - width / 2, y: y, w: width, h: height };
  }

  override left() {
    super.left();
    this.bounds.x = this.getX() - this.width / 2;
  }

  override right() {
    super.right();
    this.bounds.x = this.getX() - this.width / 2;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    const x = this.getX() - this.width / 2;
    const y = this.y - this.height / 2;
    ctx.drawImage(this.image, x, y, this.width, this.height);
    ctx.restore();
  }

  getBounds(): Rectangle {
    return this.bounds;
  }
}
