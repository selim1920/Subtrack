import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SubscriptionService, Subscription, Provider } from '../../../services/subscription.service';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-admin-subscription-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './subscription-list.html',
  styleUrls: ['./subscription-list.scss']
})
export class AdminSubscriptionList {
  subscriptions: (Subscription & { provider?: Provider })[] = [];
  searchTerm = '';
  loading = true;
  error: string | null = null;

  currentPage = 1;
  itemsPerPage = 6;

  constructor(
    private subscriptionService: SubscriptionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAdmin || !this.authService.isAdmin()) {
      this.error = "Vous n'avez pas accès à cette page.";
      this.loading = false;
      return;
    }

    this.subscriptionService.getAllSubscriptionsAdmin().subscribe({
      next: (subs) => {
        this.subscriptions = subs;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur API admin subscriptions :', err);
        this.error = err.status === 403
          ? "Accès interdit. Vous n'êtes pas admin."
          : 'Erreur lors du chargement des abonnements admin.';
        this.loading = false;
      }
    });
  }

  applyFilter() {
    this.currentPage = 1;
  }

  get filteredSubscriptions() {
    if (!this.searchTerm) return this.subscriptions;
    const term = this.searchTerm.toLowerCase();
    return this.subscriptions.filter(sub =>
      sub.name.toLowerCase().includes(term) ||
      sub.provider?.nom?.toLowerCase().includes(term)
    );
  }

  get pagedSubscriptions() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredSubscriptions.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredSubscriptions.length / this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
