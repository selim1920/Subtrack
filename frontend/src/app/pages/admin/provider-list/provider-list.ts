import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProviderService, Provider } from '../../../services/provider.service';

@Component({
  selector: 'app-provider-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './provider-list.html',
  styleUrls: ['./provider-list.scss']
})
export class ProviderListComponent implements OnInit {
  providers: Provider[] = [];
  loading = false;
  error: string | null = null;

  // add/edit
  newProvider: Partial<Provider> = { nom: '', logo: '' };
  editingProvider: Provider | null = null;

  // search & pagination
  searchTerm = '';
  currentPage = 1;
  pageSize = 4;

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.loadProviders();
  }

  loadProviders(): void {
    this.loading = true;
    this.providerService.getProviders().subscribe({
      next: (data) => {
        this.providers = data || [];
        this.error = null;
        this.currentPage = 1;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors du chargement des providers.';
        this.loading = false;
      }
    });
  }

  // Create
  addProvider(): void {
    if (!this.newProvider.nom?.trim() || !this.newProvider.logo?.trim()) {
      this.error = 'Remplissez le nom et l\'URL du logo.';
      return;
    }
    this.providerService.addProvider({
      nom: this.newProvider.nom.trim(),
      logo: this.newProvider.logo!.trim()
    }).subscribe({
      next: () => {
        this.newProvider = { nom: '', logo: '' };
        this.error = null;
        this.loadProviders();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors de la création du provider.';
      }
    });
  }

  // Edit
  startEdit(p: Provider): void {
    this.editingProvider = { ...p };
    this.error = null;
  }

  saveProvider(): void {
    if (!this.editingProvider) return;
    if (!this.editingProvider.nom?.trim() || !this.editingProvider.logo?.trim()) {
      this.error = 'Remplissez le nom et l\'URL du logo.';
      return;
    }
    this.providerService.updateProvider(this.editingProvider.id!, {
      nom: this.editingProvider.nom.trim(),
      logo: this.editingProvider.logo!.trim()
    }).subscribe({
      next: () => {
        this.editingProvider = null;
        this.error = null;
        this.loadProviders();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors de la mise à jour.';
      }
    });
  }

  cancelEdit(): void {
    this.editingProvider = null;
    this.error = null;
  }

  // Delete
  deleteProvider(id?: number): void {
    if (!id) return;
    if (!confirm('Voulez-vous vraiment supprimer ce provider ?')) return;
    this.providerService.deleteProvider(id).subscribe({
      next: () => {
        this.error = null;
        this.loadProviders();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors de la suppression.';
      }
    });
  }

  // filtering + pagination helpers
  get filtered() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.providers;
    return this.providers.filter(p =>
      p.nom.toLowerCase().includes(term)
    );
  }

  get paginated() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  totalPages() {
    return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }

  // quick refresh button
  refresh() {
    this.loadProviders();
  }

  // small stat: number of providers
  get count() {
    return this.providers.length;
  }
}
