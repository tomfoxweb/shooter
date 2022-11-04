import { DynamicObject } from './dynamic-object';

export class Player extends DynamicObject {
  private readonly sx = 10;

  left() {
    this.move(-this.sx, 0);
  }

  right() {
    this.move(this.sx, 0);
  }
}
