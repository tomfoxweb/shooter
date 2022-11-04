export const enum DrawableType {
  Player,
  Missle,
  Enemy,
}

export interface Drawable {
  draw(ctx: CanvasRenderingContext2D): void;
}
