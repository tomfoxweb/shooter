import { ImageProviderService } from '../image-provider.service';
import { DrawableType } from './drawable/drawable';
import { Player } from './drawable/player';

export class Game {
  private imageProvider: ImageProviderService;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;

  constructor(imageProvider: ImageProviderService, canvas: HTMLCanvasElement) {
    this.imageProvider = imageProvider;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
    this.player = this.createPlayer();
    this.draw();
  }

  left() {
    this.player.left();
  }

  right() {
    this.player.right();
  }

  restart() {
    this.player = this.createPlayer();
  }

  private draw() {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
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
}
