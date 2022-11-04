import { TitleStrategy } from '@angular/router';
import { ImageProviderService } from '../image-provider.service';
import { Rectangle } from './boundable';
import { DrawableType } from './drawable';
import { Enemy } from './enemy';
import { intersect } from './intersect';
import { Missle } from './missle';
import { Player } from './player';

export class Game {
  private imageProvider: ImageProviderService;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private enemies: Enemy[];
  private missles: Missle[];
  private leftBorder: Rectangle;
  private rightBorder: Rectangle;
  private topBorder: Rectangle;
  private bottomBorder: Rectangle;
  private timeNextEnemySpawn: number;

  constructor(imageProvider: ImageProviderService, canvas: HTMLCanvasElement) {
    this.imageProvider = imageProvider;
    this.canvas = canvas;
    this.leftBorder = { x: -1000, y: 0, w: 1000, h: this.canvas.height };
    this.rightBorder = {
      x: this.canvas.width,
      y: 0,
      w: 1000,
      h: this.canvas.height,
    };
    this.topBorder = { x: 0, y: -1000, w: this.canvas.width, h: 1000 };
    this.bottomBorder = {
      x: 0,
      y: this.canvas.height,
      w: this.canvas.width,
      h: 1000,
    };
    this.ctx = this.canvas.getContext('2d')!;
    this.player = this.createPlayer();
    this.missles = [];
    this.enemies = [];
    this.timeNextEnemySpawn = performance.now();
    this.startGameLoop();
  }

  left(speedAtStart: number) {
    this.player.left(speedAtStart);
  }

  right(speedAtStart: number) {
    this.player.right(speedAtStart);
  }

  fire() {
    const missles = this.player.fire();
    this.missles.push(...missles);
  }

  restart() {
    this.player = this.createPlayer();
    this.missles = [];
    this.enemies = [];
    this.timeNextEnemySpawn = performance.now();
  }

  private startGameLoop() {
    window.setInterval(() => {
      if (performance.now() > this.timeNextEnemySpawn) {
        this.spawnEnemy();
      }
      this.move();
      this.draw();
    }, 16);
  }

  private move() {
    this.movePlayer();
    this.missles.forEach((missle, missleIndex) => {
      missle.move();
      this.enemies.forEach((enemy, enemyIndex) => {
        if (intersect(missle.getBounds(), enemy.getBounds())) {
          this.missles.splice(missleIndex, 1);
          this.enemies.splice(enemyIndex, 1);
        }
      });
      if (intersect(missle.getBounds(), this.topBorder)) {
        this.missles.splice(missleIndex, 1);
      }
    });
    this.enemies.forEach((x, index) => {
      x.move();
      if (intersect(x.getBounds(), this.bottomBorder)) {
        this.gameOver();
      }
      if (intersect(x.getBounds(), this.player.getBounds())) {
        this.gameOver();
      }
    });
  }

  private movePlayer() {
    if (intersect(this.player.getBounds(), this.leftBorder)) {
      this.player.bounceRight();
    } else if (intersect(this.player.getBounds(), this.rightBorder)) {
      this.player.bounceLeft();
    }
    this.player.move();
  }

  private draw() {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
    this.missles.forEach((x) => {
      x.draw(this.ctx);
    });
    this.enemies.forEach((x) => {
      x.draw(this.ctx);
    });
    this.ctx.restore();
  }

  private spawnEnemy() {
    this.enemies.push(this.createEnemy());
    const delay = Math.random() * 10000 + 300;
    this.timeNextEnemySpawn = performance.now() + delay;
  }

  private createPlayer(): Player {
    const playerWidth = 100;
    const playerHeight = 100;
    const x = this.canvas.width / 2;
    const y = this.canvas.height - playerHeight - 10;
    const image = this.imageProvider.getImage(DrawableType.Player);
    const missleImage = this.imageProvider.getImage(DrawableType.Missle);
    return new Player(x, y, playerWidth, playerHeight, image, missleImage);
  }

  private createEnemy(): Enemy {
    const width = 97;
    const height = 70;
    const x = Math.trunc(Math.random() * (this.canvas.width - width));
    const y = -height;
    const image = this.imageProvider.getImage(DrawableType.Enemy);
    return new Enemy(x, y, width, height, image);
  }

  private gameOver() {
    alert('Game Over!');
    this.restart();
  }
}
