// dashboard-admin.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../../services/auth';
import { ProviderService, Provider } from '../../../services/provider.service';
import { SubscriptionService, Subscription } from '../../../services/subscription.service';
import { ReclamationService, ReclamationData } from '../../../services/reclamation';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule
} from 'ng-apexcharts';
import { firstValueFrom } from 'rxjs';

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
};

export type BarChartOptions = {
  series: { name: string; data: number[] }[];
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './dashboard-admin.html',
  styleUrls: ['./dashboard-admin.scss']
})
export class DashboardAdmin implements OnInit {
  @ViewChild('chart') chart?: ChartComponent;

  // Données
  users: User[] = [];
  providers: Provider[] = [];
  subscriptions: Subscription[] = [];
  reclamations: ReclamationData[] = [];

  // Comptages
  userCount = 0;
  providerCount = 0;
  subscriptionCount = 0;

  loading = true;
  error: string | null = null;

  // Graphiques
  pieChartOptions!: Partial<PieChartOptions>;
  barChartOptions!: Partial<BarChartOptions>;

  // Modal utilisateurs
  showModal = false;
  editingUser: User | null = null;
  userFormModel: Partial<User> = {};

  // Modal réclamations
  showReclamationsModal = false;

  // Alert
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';

  constructor(
    private authService: AuthService,
    private providerService: ProviderService,
    private subscriptionService: SubscriptionService,
    private reclamationService: ReclamationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const [users, providers, subscriptions] = await Promise.all([
        firstValueFrom(this.authService.getUsers()),
        firstValueFrom(this.providerService.getProviders()),
        firstValueFrom(this.subscriptionService.getAllSubscriptionsAdmin())
      ]);

      this.users = users;
      this.providers = providers;
      this.subscriptions = subscriptions;

      this.userCount = users.length;
      this.providerCount = providers.length;
      this.subscriptionCount = subscriptions.length;

      this.initPieChart();
      this.initBarChart();

      this.loading = false;
    } catch (err) {
      console.error('Erreur chargement dashboard', err);
      this.error = "Erreur lors du chargement des données.";
      this.loading = false;
    }
  }

  // Graphiques
  initPieChart(): void {
    const providerCounts: Record<string, number> = {};
    this.subscriptions.forEach(sub => {
      const providerName = sub.provider?.nom || 'Inconnu';
      providerCounts[providerName] = (providerCounts[providerName] || 0) + 1;
    });

    this.pieChartOptions = {
      series: Object.values(providerCounts),
      chart: { type: 'pie', height: 350 },
      labels: Object.keys(providerCounts),
      title: { text: 'Répartition des abonnements par provider' },
      responsive: [
        { breakpoint: 480, options: { chart: { width: 300 }, legend: { position: 'bottom' } } }
      ]
    };
  }

  initBarChart(): void {
    const monthlyCounts = Array(12).fill(0);
    this.subscriptions.forEach(sub => {
      const month = new Date(sub.created_at).getMonth();
      monthlyCounts[month]++;
    });

    this.barChartOptions = {
      series: [{ name: 'Abonnements', data: monthlyCounts }],
      chart: { type: 'bar', height: 350 },
      xaxis: { categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'] },
      title: { text: 'Abonnements créés par mois' },
      responsive: [
        { breakpoint: 480, options: { chart: { width: 300 }, legend: { position: 'bottom' } } }
      ]
    };
  }

  // Utilisateurs
  openAddUser(): void {
    this.editingUser = null;
    this.userFormModel = {};
    this.showModal = true;
  }

  openEditUser(user: User): void {
    this.editingUser = user;
    this.userFormModel = { ...user };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.userFormModel = {};
    this.editingUser = null;
  }

  saveUser(): void {
    if (this.editingUser) {
      this.authService.updateUser(this.userFormModel as User).subscribe({
        next: updated => {
          const index = this.users.findIndex(u => u.id === updated.id);
          if (index > -1) this.users[index] = updated;
          this.closeModal();
          this.showAlert('Utilisateur modifié avec succès', 'success');
        },
        error: err => {
          console.error(err);
          this.showAlert('Erreur lors de la modification', 'error');
        }
      });
    } else {
      this.authService.addUser(this.userFormModel).subscribe({
        next: added => {
          this.users.push(added);
          this.userCount++;
          this.closeModal();
          this.showAlert('Utilisateur ajouté avec succès', 'success');
        },
        error: err => {
          console.error(err);
          this.showAlert('Erreur lors de l\'ajout', 'error');
        }
      });
    }
  }

  deleteUser(id: number): void {
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;
    this.authService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
        this.userCount--;
        this.showAlert('Utilisateur supprimé avec succès', 'success');
      },
      error: err => {
        console.error(err);
        this.showAlert('Erreur lors de la suppression', 'error');
      }
    });
  }

  async openReclamations(): Promise<void> {
  try {
    this.reclamations = await firstValueFrom(this.reclamationService.getReclamations());
    this.showReclamationsModal = true;
  } catch (err) {
    console.error('Erreur lors du chargement des réclamations', err);
    this.showAlert('Impossible de charger les réclamations', 'error');
  }
}

closeReclamationsModal(): void {
  this.showReclamationsModal = false;
  this.reclamations = [];
}

// Exemple de suppression
deleteReclamation(id: number): void {
  if (!confirm('Voulez-vous vraiment supprimer cette réclamation ?')) return;
  this.reclamationService.deleteReclamation(id).subscribe({
    next: () => {
      this.reclamations = this.reclamations.filter(r => r.id !== id);
      this.showAlert('Réclamation supprimée avec succès', 'success');
    },
    error: err => {
      console.error(err);
      this.showAlert('Erreur lors de la suppression', 'error');
    }
  });
}


  // Alert
  showAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => this.alertMessage = '', 5000);
  }
}
