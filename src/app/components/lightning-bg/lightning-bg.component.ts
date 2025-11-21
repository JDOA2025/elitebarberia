import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lightning-bg',
  standalone: true,
  templateUrl: './lightning-bg.component.html',
  styleUrl: './lightning-bg.component.scss'
})
export class LightningBgComponent implements AfterViewInit {

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const canvas = this.canvas.nativeElement;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Ajuste del tamaño
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // === AQUÍ VA TU SHADER COMPLETO ===
    // (No lo copio para no hacer ruido, pero lo pegamos si lo necesitas)
  }
}
