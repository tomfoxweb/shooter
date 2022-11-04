import { ImageProviderService } from '../image-provider.service';
import { Rectangle } from './boundable';
import { DrawableType } from './drawable';
import { intersect } from './intersect';
import { Missle } from './missle';
import { Player } from './player';

export class Game {
  private imageProvider: ImageProviderService;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private missle: Missle;
  private leftBorder: Rectangle;
  private rightBorder: Rectangle;
  private topBorder: Rectangle;
  private bottomBorder: Rectangle;

  constructor(imageProvider: ImageProviderService, canvas: HTMLCanvasElement) {
    this.imageProvider = imageProvider;
    this.canvas = canvas;
    this.leftBorder = { x: -10, y: 0, w: 10, h: this.canvas.height };
    this.rightBorder = {
      x: this.canvas.width,
      y: 0,
      w: 10,
      h: this.canvas.height,
    };
    this.topBorder = { x: 0, y: -10, w: this.canvas.width, h: 10 };
    this.bottomBorder = {
      x: 0,
      y: this.canvas.height,
      w: this.canvas.width,
      h: 10,
    };
    this.ctx = this.canvas.getContext('2d')!;
    this.player = this.createPlayer();
    this.missle = this.createMissle();
    this.startGameLoop();
  }

  left() {
    if (intersect(this.player.getBounds(), this.leftBorder)) {
      return;
    }
    this.player.left();
  }

  right() {
    if (intersect(this.player.getBounds(), this.rightBorder)) {
      return;
    }
    this.player.right();
  }

  restart() {
    this.player = this.createPlayer();
  }

  private startGameLoop() {
    window.setInterval(() => {
      this.draw();
    }, 16);
  }

  private draw() {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
    this.missle.draw(this.ctx);
    this.ctx.restore();
  }

  private createPlayer(): Player {
    const playerWidth = 100;
    const playerHeight = 100;
    const x = this.canvas.width / 2;
    const y = this.canvas.height - playerHeight - 10;
    const image = this.imageProvider.getImage(DrawableType.Player);
    return new Player(x, y, playerWidth, playerHeight, image);
  }

  private createMissle(): Missle {
    const width = 5;
    const height = 32;
    const x = this.canvas.width / 2;
    const y = this.canvas.height / 2;
    const image = this.imageProvider.getImage(DrawableType.Missle);
    return new Missle(x, y, width, height, image);
  }
}