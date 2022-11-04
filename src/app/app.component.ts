import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DrawableType } from './game/drawable/drawable';
import { Player } from './game/drawable/player';
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

  @ViewChild('canvasGame') canvasGame!: ElementRef<HTMLCanvasElement>;

  constructor(private imageProvider: ImageProviderService) {}

  async ngAfterViewInit() {
    const canvas = this.canvasGame.nativeElement;
    const css = window.getComputedStyle(canvas);
    canvas.width = Number.parseInt(css.width);
    canvas.height = Number.parseInt(css.height);
    await this.imageProvider.loadImages();
    this.game = new Game(this.imageProvider, canvas);
  }
}
