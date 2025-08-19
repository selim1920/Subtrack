import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth';
import { SubscriptionService, Subscription, Provider } from 'src/app/services/subscription.service';

import { BajajChartComponent } from 'src/app/theme/shared/components/apexchart/bajaj-chart/bajaj-chart.component';
import { BarChartComponent } from 'src/app/theme/shared/components/apexchart/bar-chart/bar-chart.component';
import { ChartDataMonthComponent } from 'src/app/theme/shared/components/apexchart/chart-data-month/chart-data-month.component';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    CommonModule,
    BajajChartComponent,
    BarChartComponent,
    ChartDataMonthComponent,
  ],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  subscriptionCount = 0;
  userName: string = '';
  totalAmount: number = 0;

  userSubscriptions: Subscription[] = [];
  providers: Provider[] = [];
  providersWithUserSubs: Provider[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadUserSubscriptionsAndProviders();
  }

  logout(): void {
    this.auth.logout().subscribe({
      next: () => {
        alert('Déconnexion réussie');
        this.auth.clearStorage();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erreur lors de la déconnexion', err);
        alert('Erreur lors de la déconnexion : ' + (err.error?.message || err.statusText));
      },
    });
  }

  loadUserInfo(): void {
    const user = this.auth.getUser();
    this.userName = user?.name || 'Utilisateur';
  }

  loadUserSubscriptionsAndProviders(): void {
    const user = this.auth.getUser();
    if (!user) {
      console.warn('Aucun utilisateur trouvé dans le localStorage.');
      return;
    }

    const userId = Number(user.id);

    this.subscriptionService.getSubscriptions().subscribe({
      next: (subs: Subscription[]) => {
        this.userSubscriptions = subs.filter(sub => Number(sub.user_id) === userId);
        this.subscriptionCount = this.userSubscriptions.length;
        this.totalAmount = this.userSubscriptions.reduce((sum, sub) => sum + (sub.amount || 0), 0);

        this.subscriptionService.getProviders().subscribe({
          next: (providers: Provider[]) => {
            this.providers = providers;
            const userProviderIds = new Set(this.userSubscriptions.map(sub => sub.provider_id));
            this.providersWithUserSubs = this.providers.filter(p => userProviderIds.has(p.id));
          },
          error: (err) => {
            console.error('Erreur lors du chargement des providers', err);
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement des abonnements', err);
      }
    });
  }
}
