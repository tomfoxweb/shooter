import { Rectangle } from '../core/boundable';
import { PlayerShip } from '../core/player-ship';
import { Drawable } from './drawable';

export class Player extends PlayerShip implements Drawable {
  private width: number;
  private height: number;
  private y: number;
  private image: HTMLImageElement;

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
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    const x = this.getX() - this.width / 2;
    const y = this.y - this.height / 2;
    ctx.drawImage(this.image, x, y, this.width, this.height);
    ctx.restore();
  }

  getBounds(): Rectangle {
    throw new Error('Method not implemented.');
  }
}
