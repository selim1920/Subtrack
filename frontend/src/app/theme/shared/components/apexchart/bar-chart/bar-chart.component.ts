import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent, ApexOptions } from 'ng-apexcharts';
import { SubscriptionService, Subscription } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,  // <-- Important pour un composant standalone
  imports: [ChartComponent],  // si tu utilises des composants dans le template, il faut les importer ici
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions!: Partial<ApexOptions>;

  categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.initChartOptions();
    this.loadSubscriptionsData();
  }

  initChartOptions() {
    this.chartOptions = {
      series: [
        {
          name: 'Abonnements créés',
          data: Array(12).fill(0)
        }
      ],
      chart: {
        type: 'bar',
        height: 480,
        stacked: false,
        toolbar: { show: true },
        background: 'transparent'
      },
      dataLabels: { enabled: false },
      plotOptions: { bar: { horizontal: false, columnWidth: '50%' } },
      xaxis: { type: 'category', categories: this.categories },
      colors: ['#2196f3'],
      tooltip: { theme: 'light' }
    };
  }

  loadSubscriptionsData() {
    this.subscriptionService.getSubscriptions().subscribe({
      next: (subs: Subscription[]) => {
        const counts = Array(12).fill(0);

        subs.forEach(sub => {
          if (sub.created_at) {
            const date = new Date(sub.created_at);
            const month = date.getMonth();
            counts[month]++;
          }
        });

        this.chartOptions.series = [
          {
            name: 'Abonnements créés',
            data: counts
          }
        ];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des abonnements', err);
      }
    });
  }
getTotalSubscriptions(): number {
  const series = this.chartOptions?.series;
  if (!series || series.length === 0) return 0;

  // Forcer le typage ici pour éviter l'erreur
  const firstSeries = series[0] as { data?: number[] };

  if (!firstSeries.data || !Array.isArray(firstSeries.data)) return 0;

  return firstSeries.data.reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
}


}
