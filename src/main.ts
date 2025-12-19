import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

import 'zone.js';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// 🔥 AngularFire
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';

import { environment } from './environments';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,

    // ✅ Firebase App (SIEMPRE)
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    // ✅ Firebase Analytics (SOLO navegador)
    ...(typeof window !== 'undefined'
      ? [provideAnalytics(() => getAnalytics())]
      : [])
  ]
});
