import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import composants standalone (attention, ils doivent être standalone: true)
import { CardComponent } from './components/card/card.component';
import { BarChartComponent } from './components/apexchart/bar-chart/bar-chart.component';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgbDropdownModule, NgbNavModule, NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [ ],  // aucun composant à déclarer ici car standalone

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbModule,
    NgbCollapseModule,
    NgScrollbarModule,
    NgApexchartsModule,

    // Import des composants standalone ici
    CardComponent,
    BarChartComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbCollapseModule,
    NgScrollbarModule,
    NgApexchartsModule,

    // Export des composants standalone si besoin ailleurs
    CardComponent,
    BarChartComponent
  ]
})
export class SharedModule {}
