import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'elite-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './elite-popup.component.html',
  styleUrls: ['./elite-popup.component.scss']
})
export class ElitePopupComponent {

  isVisible = false;

  ngOnInit() {
    const shown = sessionStorage.getItem('elitePopupShown');

    if (!shown) {
      setTimeout(() => {
        this.isVisible = true;
        sessionStorage.setItem('elitePopupShown', 'true');
      }, 2500);
    }
  }

  close() {
    this.isVisible = false;
  }

goToReserva() {
  this.isVisible = false;

  setTimeout(() => {
    document.querySelector('#reserva')
      ?.scrollIntoView({ behavior: 'smooth' });
  }, 200);
}

}
