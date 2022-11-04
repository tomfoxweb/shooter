export const enum DrawableType {
  Player,
  Missle,
  Enemy1,
  Enemy2,
  Enemy3,
  Star1,
  Star2,
  Star3,
  Star4,
  Star5,
}

export interface Drawable {
  draw(ctx: CanvasRenderingContext2D): void;
}
