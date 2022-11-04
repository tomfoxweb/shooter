import { GameObject } from './game-object';

export class DynamicObject extends GameObject {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    image: HTMLImageElement
  ) {
    super(x, y, width, height, image);
  }

  move(sx: number, sy: number) {
    this.x += sx;
    this.y += sy;
    this.bounds.x = this.x;
    this.bounds.y = this.y;
  }
}
