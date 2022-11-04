import { Boundable } from '../core/boundable';

export const enum DrawableType {
  Player,
  Bullet,
  Rocket,
  Enemy,
}

export interface Drawable extends Boundable {
  draw(ctx: CanvasRenderingContext2D): void;
}
