import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { NgApexchartsModule } from 'ng-apexcharts';

// Active le mode production si nécessaire
if (environment.production) {
  enableProdMode();
}

// Bootstrap de l'application
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      NgApexchartsModule, // ✅ Import ApexCharts ici
      HttpClientModule    // ✅ Import HttpClient ici
    ),
    provideAnimations()
  ]
}).catch(err => console.error(err));
