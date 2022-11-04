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
  private readonly playerWidth = 100;
  private readonly playerHeight = 100;
  private readonly enemyWidth = 97;
  private readonly enemyHeight = 70;
  private readonly timerInterval = 16;

  constructor(imageProvider: ImageProviderService, canvas: HTMLCanvasElement) {
    this.imageProvider = imageProvider;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
    this.leftBorder = this.createLeftBorder();
    this.rightBorder = this.createRightBorder();
    this.topBorder = this.createTopBorder();
    this.bottomBorder = this.createBottomBorder();
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
      this.checkForSpawnEnemy();
      this.move();
      this.draw();
    }, this.timerInterval);
  }

  private move() {
    this.movePlayer();
    this.moveMissles();
    this.moveEnemies();
  }

  private movePlayer() {
    if (intersect(this.player.getBounds(), this.leftBorder)) {
      this.player.bounceRight();
    } else if (intersect(this.player.getBounds(), this.rightBorder)) {
      this.player.bounceLeft();
    }
    this.player.move();
  }

  private moveMissles() {
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
  }

  private moveEnemies() {
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

  private checkForSpawnEnemy() {
    if (performance.now() < this.timeNextEnemySpawn) {
      return;
    }
    this.enemies.push(this.createEnemy());
    const delay = Math.random() * 2000 + 500;
    this.timeNextEnemySpawn = performance.now() + delay;
  }

  private createPlayer(): Player {
    const x = this.canvas.width / 2 - this.playerWidth / 2;
    const y = this.canvas.height - this.playerHeight - 10;
    const image = this.imageProvider.getImage(DrawableType.Player);
    const missleImage = this.imageProvider.getImage(DrawableType.Missle);
    return new Player(
      x,
      y,
      this.playerWidth,
      this.playerHeight,
      image,
      missleImage
    );
  }

  private createEnemy(): Enemy {
    const x = Math.trunc(Math.random() * (this.canvas.width - this.enemyWidth));
    const y = -this.enemyHeight;
    const image = this.imageProvider.getImage(DrawableType.Enemy);
    return new Enemy(x, y, this.enemyWidth, this.enemyHeight, image);
  }

  private createLeftBorder(): Rectangle {
    return { x: -1000, y: 0, w: 1000, h: this.canvas.height };
  }

  private createRightBorder(): Rectangle {
    return {
      x: this.canvas.width,
      y: 0,
      w: 1000,
      h: this.canvas.height,
    };
  }

  private createTopBorder(): Rectangle {
    return { x: 0, y: -1000, w: this.canvas.width, h: 1000 };
  }

  private createBottomBorder(): Rectangle {
    return {
      x: 0,
      y: this.canvas.height,
      w: this.canvas.width,
      h: 1000,
    };
  }

  private gameOver() {
    alert('Game Over!');
    this.restart();
  }
}
