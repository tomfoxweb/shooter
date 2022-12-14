import { DynamicObject } from './dynamic-object';
import { Missle } from './missle';

export class Player extends DynamicObject {
  private speed: number;
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

  left(speedAtStart: number) {
    this.speed = -speedAtStart;
  }

  right(speedAtStart: number) {
    this.speed = speedAtStart;
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
    return this.createMissle(this.x + 20);
  }

  private createRightMissle(): Missle {
    return this.createMissle(this.x + this.w - 26);
  }

  private createMissle(missleX: number): Missle {
    const missleY = this.y + 30;
    return new Missle(
      missleX,
      missleY,
      this.missleWidth,
      this.missleHeight,
      this.missleImage
    );
  }
}
