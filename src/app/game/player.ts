import { DynamicObject } from './dynamic-object';
import { Missle } from './missle';

export class Player extends DynamicObject {
  private readonly sx = 10;
  private readonly missleWidth = 5;
  private readonly missleHeight = 32;
  private missleImage: HTMLImageElement;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    image: HTMLImageElement,
    missleImage: HTMLImageElement
  ) {
    super(x, y, width, height, image);
    this.missleImage = missleImage;
  }

  left() {
    this.move(-this.sx, 0);
  }

  right() {
    this.move(this.sx, 0);
  }

  fire(): Missle[] {
    return [this.createLeftMissle(), this.createRightMissle()];
  }

  private createLeftMissle(): Missle {
    return this.createMissle(this.x + 8);
  }

  private createRightMissle(): Missle {
    return this.createMissle(this.x + this.w - 13);
  }

  private createMissle(missleX: number): Missle {
    const missleY = this.y + 2;
    return new Missle(
      missleX,
      missleY,
      this.missleWidth,
      this.missleHeight,
      this.missleImage
    );
  }
}
