import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';

Swiper.use([Pagination, Autoplay]);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  /* =========================================================
     UI STATE
     ========================================================= */
  menuOpen = false;

  /* =========================================================
     THEME STATE
     ========================================================= */
  isDarkTheme = true;

  /* =========================================================
     RESERVA STATE
     ========================================================= */
  today = new Date().toISOString().split('T')[0];
  availableHours: string[] = [];
  selectedServices: string[] = [];

  /* =========================================================
     REVIEWS / COMENTARIOS
     ========================================================= */
  reviewSent = false;

  /* =========================================================
     MAPA DE SERVICIOS CON PRECIOS
     ========================================================= */
  servicesPrices: Record<string, number> = {
    'Corte Clásico': 230,
    'Corte + Barba': 460,
    'Barba': 230,
    'Barba Premium': 345,
    'Pigmentación de Cejas': 230,
    'Facial': 345,
    'Perfilado y Pigmentación': 400
  };

  /* =========================================================
     LIFECYCLE
     ========================================================= */
  ngAfterViewInit(): void {

    /* 🔥 INIT SWIPER HERO */
    setTimeout(() => {
      new Swiper('.hero-swiper', {
        loop: true,
        autoplay: { delay: 3000 },
        pagination: { el: '.swiper-pagination', clickable: true }
      });
    }, 50);

    /* 🎨 CARGAR TEMA GUARDADO */
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isDarkTheme = false;
      document.documentElement.classList.add('light-theme');
    }
  }

  /* =========================================================
     THEME TOGGLE
     ========================================================= */
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;

    if (this.isDarkTheme) {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  /* =========================================================
     NAVBAR / MENU
     ========================================================= */
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

  scrollToServices() {
    document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
  }

  /* =========================================================
     SERVICIOS
     ========================================================= */
  addService(service: string) {
    if (!this.selectedServices.includes(service)) {
      this.selectedServices.push(service);
    }
    this.goToForm(new Event('click'));
  }

  clearServices() {
    this.selectedServices = [];
  }

  get totalAmount(): number {
    return this.selectedServices.reduce((total, service) => {
      return total + (this.servicesPrices[service] || 0);
    }, 0);
  }

  /* =========================================================
     FECHA / HORAS
     ========================================================= */
  onDateChange(date: string) {
    this.availableHours = [];
    const day = new Date(date + 'T00:00:00').getDay();
    const end = day === 0 ? 17 : 19;

    for (let h = 10; h <= end; h++) {
      this.availableHours.push(`${h}:00`);
    }
  }

  /* =========================================================
     WHATSAPP
     ========================================================= */
  sendWhatsApp(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const nombre = (form.querySelector('[name="nombre"]') as HTMLInputElement).value;
    const barbero = (form.querySelector('[name="barbero"]') as HTMLSelectElement).value;
    const fecha = (form.querySelector('[name="fecha"]') as HTMLInputElement).value;
    const hora = (form.querySelector('[name="hora"]') as HTMLSelectElement).value;
    const nota = (form.querySelector('[name="nota"]') as HTMLTextAreaElement).value;

    const serviciosTexto = this.selectedServices
      .map(s => `• ${s} (L. ${this.servicesPrices[s]})`)
      .join('\n');

    const msg =
      `Hola, quiero reservar una cita:\n\n` +
      `Nombre: ${nombre}\n` +
      `Servicios:\n${serviciosTexto}\n\n` +
      `Total a pagar: L. ${this.totalAmount}\n\n` +
      `Barbero: ${barbero}\n` +
      `Fecha: ${fecha}\n` +
      `Hora: ${hora}\n` +
      (nota ? `\nNotas: ${nota}` : '');

    window.open(
      `https://wa.me/50431420427?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  }

  /* =========================================================
     ENVIAR COMENTARIO (UX)
     ========================================================= */
  submitReview(event: Event) {
    event.preventDefault();

    // Aquí luego se conecta Firebase
    this.reviewSent = true;

    const form = event.target as HTMLFormElement;
    form.reset();

    setTimeout(() => {
      this.reviewSent = false;
    }, 5000);
  }
}
