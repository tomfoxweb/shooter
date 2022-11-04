export class PlayerShip {
  private x: number;
  private readonly sx = 10;

  constructor(x: number) {
    this.x = x;
  }

  left() {
    this.x -= this.sx;
  }

  right() {
    this.x += this.sx;
  }

  protected getX(): number {
    return this.x;
  }
}
