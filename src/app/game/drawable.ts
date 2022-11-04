export const enum DrawableType {
  Player,
  Missle,
  Enemy,
  Star1,
  Star2,
  Star3,
  Star4,
  Star5,
}

export interface Drawable {
  draw(ctx: CanvasRenderingContext2D): void;
}
