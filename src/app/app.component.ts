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

  @ViewChild('canvasGame') canvasGame!: ElementRef<HTMLCanvasElement>;

  @HostListener('window:keydown.ArrowRight', ['$event'])
  handleArrowRight(event: KeyboardEvent) {
    if (this.imagesLoaded && this.game) {
      this.game.right();
    }
  }

  @HostListener('window:keydown.ArrowLeft', ['$event'])
  handleArrowLeft(event: KeyboardEvent) {
    if (this.imagesLoaded && this.game) {
      this.game.left();
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
}
