import { Component } from '@angular/core';
import { LightningBgComponent } from '../lightning-bg/lightning-bg.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LightningBgComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {}
