import { Component, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';

// Registrar módulos explícitamente (requerido en producción)
Swiper.use([Pagination, Autoplay]);

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  menuOpen = false;

  ngAfterViewInit(): void {

    // FIX para producción: esperar a que Angular pinte el DOM
    setTimeout(() => {
      new Swiper('.hero-swiper', {
        modules: [Pagination, Autoplay],   // Necesario en builds optimizados
        loop: true,
        autoplay: {
          delay: 2800,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        speed: 900
      });
    }, 50); // pequeño delay para que el DOM exista
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  goToForm(event: Event) {
    event.preventDefault();
    document.querySelector('#reserva')?.scrollIntoView({ behavior: 'smooth' });
  }

  sendWhatsApp(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const nombre = (form.querySelector('[name="nombre"]') as HTMLInputElement).value;
    const servicio = (form.querySelector('[name="servicio"]') as HTMLSelectElement).value;
    const barbero = (form.querySelector('[name="barbero"]') as HTMLSelectElement).value;
    const fecha = (form.querySelector('[name="fecha"]') as HTMLInputElement).value;
    const hora = (form.querySelector('[name="hora"]') as HTMLInputElement).value;
    const nota = (form.querySelector('[name="nota"]') as HTMLTextAreaElement).value;

    const msg =
      `Hola, quiero agendar una cita:\n\n` +
      `• Nombre: ${nombre}\n` +
      `• Servicio: ${servicio}\n` +
      `• Barbero: ${barbero}\n` +
      `• Fecha: ${fecha}\n` +
      `• Hora: ${hora}\n` +
      (nota ? `• Notas: ${nota}\n` : ``);

    const url = `https://wa.me/50431420427?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }
}
