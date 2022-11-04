import { DynamicObject } from './dynamic-object';

export class Enemy extends DynamicObject {
  private readonly sy = 1;

  override move() {
    super.move(0, this.sy);
  }
}
