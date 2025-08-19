import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionService, Subscription, Provider } from '../../services/subscription.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  CalendarModule,
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
import { addMonths, subMonths } from 'date-fns';
import { Subject } from 'rxjs';

// Stripe
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CalendarModule],
  templateUrl: './subscription-form.html',
  styleUrls: ['./subscription-form.scss']
})
export class SubscriptionForm implements OnInit, AfterViewChecked {
  form!: FormGroup;
  subscriptions: Subscription[] = [];
  providers: Provider[] = [];
  subscriptionId?: number;
  isEditMode = false;
  error = '';
  success = '';
  showAgenda = false;
  selectedProviderLogo: string | null = null;
  showModal = false;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  refresh: Subject<void> = new Subject();

  notifications: { title: string; body: string; date: Date }[] = [];

  // Stripe
  stripe: Stripe | null = null;
  card!: StripeCardElement;
  clientSecret: string | null = null;

  // IMPORTANT: Card element peut être undefined avant affichage du modal
  @ViewChild('cardElement', { static: false }) cardElement?: ElementRef;

  private cardMounted = false;

  constructor(
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadNotificationsFromStorage();
    this.requestNotificationPermission();
    this.initForm();
    this.loadProviders();
    this.loadSubscriptions();

    this.subscriptionId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.subscriptionId) {
      this.isEditMode = true;
      this.loadSubscription(this.subscriptionId);
      this.openModal();
    }

    // Charge la clé publique Stripe
    this.stripe = await loadStripe('pk_test_51RrbRNGaZoKBj88LRcAB6cA3xrd6KQqLpRtG07b9gAY1whljuilbKetnCgMpZy1CmuFVr2ZkSA727mGpGGwGBkbt008b8HYUnW');

    setInterval(() => {
      this.checkUpcomingPayments();
    }, 1000 * 60 * 60);
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      provider_id: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      billing_cycle: ['monthly', Validators.required],
      notes: [''],
      tags: [''],
      next_payment_date: [null, Validators.required],
    });
  }

  onProviderChange() {
    const providerId = this.form.get('provider_id')?.value;
    const provider = this.providers.find(p => p.id === providerId);
    this.selectedProviderLogo = provider?.logo || null;
  }

  loadProviders() {
    this.subscriptionService.getProviders().subscribe({
      next: (data) => this.providers = data,
      error: () => this.error = 'Erreur lors du chargement des fournisseurs.'
    });
  }

  loadSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe({
      next: (subs) => {
        this.subscriptions = subs;
        this.prepareCalendarEvents();
        this.refresh.next();
        this.cd.detectChanges();
        this.checkUpcomingPayments();
      },
      error: () => this.error = 'Erreur lors du chargement des abonnements.'
    });
  }

  loadSubscription(id: number) {
    this.subscriptionService.getSubscription(id).subscribe({
      next: (sub) => {
        this.form.patchValue({
          name: sub.name,
          provider_id: sub.provider_id,
          amount: sub.amount,
          billing_cycle: sub.billing_cycle,
          notes: sub.notes,
          tags: sub.tags?.join(', ') || '',
          next_payment_date: sub.next_payment_date?.split('T')[0] || null,
        });
        this.onProviderChange();
      },
      error: () => this.error = 'Erreur lors du chargement.'
    });
  }

  prepareCalendarEvents() {
    this.events = this.subscriptions
      .filter(sub => sub.next_payment_date)
      .map(sub => ({
        start: new Date(sub.next_payment_date!),
        title: `${sub.name} - Prochain paiement`,
        color: { primary: '#1e90ff', secondary: '#D1E8FF' },
        allDay: true,
      }));
  }

  // Cette méthode sera appelée à chaque détection de changement de vue
  ngAfterViewChecked() {
    if (this.showModal && this.clientSecret && this.cardElement && !this.cardMounted) {
      this.mountCardElement();
    }
  }

  async mountCardElement(): Promise<void> {
    if (!this.stripe || !this.clientSecret || !this.cardElement) return;

    // Si carte déjà montée, on démonte avant
    if (this.cardMounted) {
      this.card.unmount();
      this.cardMounted = false;
    }

    const elements = this.stripe.elements();
    this.card = elements.create('card');

    // Monte la carte sur le DOM
    this.card.mount(this.cardElement.nativeElement);
    this.cardMounted = true;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const formValue = { ...this.form.value };
    formValue.tags = formValue.tags
      ? formValue.tags.split(',').map((t: string) => t.trim())
      : [];

    try {
      // Création du PaymentIntent
      const paymentIntent = await this.subscriptionService
        .createPaymentIntent(formValue.amount * 100, 'usd')
        .toPromise();

      this.clientSecret = paymentIntent.clientSecret;

      // On monte la carte Stripe ici
      // Le ngAfterViewChecked s'en chargera automatiquement, pas besoin d'appeler manuellement mountCardElement()

      // Confirmer le paiement
      const result = await this.stripe!.confirmCardPayment(this.clientSecret!, {
        payment_method: {
          card: this.card,
        },
      });

      if (result.error) {
        this.error = result.error.message || 'Erreur de paiement';
        return;
      }

      if (result.paymentIntent?.status === 'succeeded') {
        if (this.isEditMode && this.subscriptionId) {
          this.subscriptionService.updateSubscription(this.subscriptionId, formValue).subscribe({
            next: () => {
              this.success = 'Abonnement mis à jour avec succès !';
              this.resetForm();
              this.loadSubscriptions();
              this.closeModal();
            },
            error: () => this.error = 'Erreur lors de la mise à jour.'
          });
        } else {
          this.subscriptionService.createSubscription(formValue).subscribe({
            next: () => {
              this.success = 'Abonnement créé avec succès !';
              this.resetForm();
              this.loadSubscriptions();
              this.closeModal();
            },
            error: () => this.error = 'Erreur lors de la création.'
          });
        }
      }
    } catch (e: any) {
      this.error = e.message || 'Erreur inattendue';
    }
  }

  openModal() {
    this.showModal = true;
    // Pas besoin d'appeler mountCardElement ici, car ngAfterViewChecked gère le montage quand le DOM est prêt
  }

  closeModal() {
    this.showModal = false;
    this.isEditMode = false;
    this.subscriptionId = undefined;
    this.resetForm();
    if (this.cardMounted) {
      this.card.unmount();
      this.cardMounted = false;
    }
  }

  resetForm() {
    this.form.reset({ billing_cycle: 'monthly' });
    this.selectedProviderLogo = null;
    this.error = '';
    this.success = '';
    this.clientSecret = null;
  }

  deleteSubscription(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet abonnement ?')) {
      this.subscriptionService.deleteSubscription(id).subscribe({
        next: () => {
          this.success = 'Abonnement supprimé.';
          this.loadSubscriptions();
        },
        error: () => this.error = 'Erreur lors de la suppression.'
      });
    }
  }

  getProviderName(providerId: number): string {
    const provider = this.providers.find(p => p.id === providerId);
    return provider ? provider.nom : 'Inconnu';
  }

  editSubscription(sub: Subscription) {
    this.isEditMode = true;
    this.subscriptionId = sub.id;
    this.form.patchValue({
      name: sub.name,
      provider_id: sub.provider_id,
      amount: sub.amount,
      billing_cycle: sub.billing_cycle,
      notes: sub.notes,
      tags: sub.tags?.join(', ') || '',
      next_payment_date: sub.next_payment_date?.split('T')[0] || null,
    });
    this.onProviderChange();
    this.openModal();
  }

  increment() {
    this.viewDate = addMonths(this.viewDate, 1);
  }

  decrement() {
    this.viewDate = subMonths(this.viewDate, 1);
  }

  today() {
    this.viewDate = new Date();
  }

  toggleAgenda() {
    this.showAgenda = !this.showAgenda;
  }

  loadNotificationsFromStorage() {
    const stored = localStorage.getItem('app-notifications');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.notifications = parsed.map((notif: any) => ({
          ...notif,
          date: new Date(notif.date)
        }));
      } catch {
        this.notifications = [];
      }
    }
  }

  saveNotificationsToStorage() {
    localStorage.setItem('app-notifications', JSON.stringify(this.notifications));
  }

  requestNotificationPermission() {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission !== 'granted') {
          console.warn('Permission de notification refusée');
        }
      });
    }
  }

  checkUpcomingPayments() {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    const today = new Date();

    this.subscriptions.forEach(sub => {
      if (!sub.next_payment_date) return;

      const nextPaymentDate = new Date(sub.next_payment_date);
      const diffTime = nextPaymentDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0 && diffDays <= 3) {
        const storageKey = `notified-sub-${sub.id}`;
        const lastNotifiedDateStr = localStorage.getItem(storageKey);

        if (lastNotifiedDateStr !== sub.next_payment_date) {
          const title = 'Prochain paiement';
          const body = `L’abonnement "${sub.name}" doit être payé dans ${diffDays} jour(s).`;

          new Notification(title, {
            body,
            icon: sub.logo_path || '',
          });

          this.notifications.unshift({ title, body, date: new Date() });
          this.saveNotificationsToStorage();
          localStorage.setItem(storageKey, sub.next_payment_date);
          this.cd.detectChanges();
        }
      } else {
        localStorage.removeItem(`notified-sub-${sub.id}`);
      }
    });
  }

  clearNotifications() {
    this.notifications = [];
    this.saveNotificationsToStorage();
  }

  hideImage(event: Event) {
    const target = event.target as HTMLElement;
    if (target) {
      target.style.display = 'none';
    }
  }
}
