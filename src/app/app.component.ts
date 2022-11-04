import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Game } from './game/game';
import { ImageProviderService } from './image-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'shooter';
  private game!: Game;
  private imagesLoaded = false;
  private touchStartX = 0;
  private touchStartY = 0;
  private touchEndX = 0;
  private touchEndY = 0;

  @ViewChild('canvasGame') canvasGame!: ElementRef<HTMLCanvasElement>;

  @HostListener('window:keydown.ArrowUp', ['$event'])
  handleArrowUp(event: KeyboardEvent) {
    if (this.imagesLoaded && this.game) {
      this.game.fire();
    }
  }

  @HostListener('window:keydown.ArrowRight', ['$event'])
  handleArrowRight(event: KeyboardEvent) {
    if (this.imagesLoaded && this.game) {
      this.game.right(20);
    }
  }

  @HostListener('window:keydown.ArrowLeft', ['$event'])
  handleArrowLeft(event: KeyboardEvent) {
    if (this.imagesLoaded && this.game) {
      this.game.left(20);
    }
  }

  @HostListener('window:pointerdown', ['$event'])
  handlePointerDown(event: PointerEvent) {
    this.setStartTouchPosition(event.clientX, event.clientY);
  }

  @HostListener('window:pointerup', ['$event'])
  handlePointerUp(event: PointerEvent) {
    this.setEndTouchPosition(event.clientX, event.clientY);
    this.processPointerMove();
  }

  @HostListener('window:touchstart', ['$event'])
  handleTouchDown(event: TouchEvent) {
    if (event.changedTouches.length > 0) {
      const x = event.changedTouches[0].clientX;
      const y = event.changedTouches[0].clientY;
      this.setStartTouchPosition(x, y);
    }
  }

  @HostListener('window:touchend', ['$event'])
  handleTouchEnd(event: TouchEvent) {
    if (event.changedTouches.length > 0) {
      const x = event.changedTouches[0].clientX;
      const y = event.changedTouches[0].clientY;
      this.setEndTouchPosition(x, y);
      this.processPointerMove();
    }
  }

  constructor(private imageProvider: ImageProviderService) {}

  async ngAfterViewInit() {
    const canvas = this.canvasGame.nativeElement;
    const css = window.getComputedStyle(canvas);
    canvas.width = Number.parseInt(css.width);
    canvas.height = Number.parseInt(css.height);
    await this.imageProvider.loadImages();
    this.imagesLoaded = true;
    this.game = new Game(this.imageProvider, canvas);
  }

  private setStartTouchPosition(x: number, y: number): void {
    this.touchStartX = x;
    this.touchStartY = y;
  }

  private setEndTouchPosition(x: number, y: number): void {
    this.touchEndX = x;
    this.touchEndY = y;
  }

  private processPointerMove(): void {
    const sx = Math.abs(this.touchEndX - this.touchStartX);
    const sy = Math.abs(this.touchEndY - this.touchStartY);
    if (sx + sy < 30) {
      return;
    }
    if (sx > sy) {
      const diffX = Math.trunc(Math.abs(this.touchEndX - this.touchStartX));
      const speed = diffX % 20;
      if (this.touchEndX > this.touchStartX) {
        this.game.right(speed);
      } else {
        this.game.left(speed);
      }
    } else {
      this.game.fire();
    }
  }
}
