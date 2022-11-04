import { DynamicObject } from './dynamic-object';

export class Missle extends DynamicObject {
  private readonly sy = 10;

  override move() {
    super.move(0, -this.sy);
  }
}
