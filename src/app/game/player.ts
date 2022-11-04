import { DynamicObject } from './dynamic-object';
import { Missle } from './missle';

export class Player extends DynamicObject {
  private speed: number;
  private readonly speedAtStart = 20;
  private readonly bounceSpeed = 5;
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
    this.speed = 0;
  }

  left() {
    this.speed = -this.speedAtStart;
  }

  right() {
    this.speed = this.speedAtStart;
  }

  bounceRight() {
    this.speed = this.bounceSpeed;
  }

  bounceLeft() {
    this.speed = -this.bounceSpeed;
  }

  override move() {
    if (this.speed === 0) {
      return;
    }
    super.move(this.speed, 0);
    if (this.speed > 0) {
      this.speed--;
    } else if (this.speed < 0) {
      this.speed++;
    }
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
