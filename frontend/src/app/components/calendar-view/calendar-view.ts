import { Component, OnInit } from '@angular/core';
import { SubscriptionService, Subscription } from '../../services/subscription.service';
import { AuthService, User } from '../../services/auth';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatTooltipModule
  ],
  templateUrl: './calendar-view.html',
  styleUrls: ['./calendar-view.scss']
})
export class CalendarView implements OnInit {
  subscriptions: Subscription[] = [];
  selectedDate?: Date;
  user: User | null = null;

  constructor(
    private subscriptionService: SubscriptionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe({
      next: (subs) => {
        this.subscriptions = subs;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des subscriptions', err);
      }
    });
  }

  getSubscriptionsByDate(date: Date): Subscription[] {
    return this.subscriptions.filter(sub => {
      const subDate = new Date(sub.created_at);
      return subDate.toDateString() === date.toDateString();
    });
  }

  getSubscriptionsByNextPaymentDate(date: Date): Subscription[] {
    return this.subscriptions.filter(sub => {
      if (!sub.next_payment_date) return false;
      const paymentDate = new Date(sub.next_payment_date);
      return paymentDate.toDateString() === date.toDateString();
    });
  }

  hasSubscriptions(date: Date): boolean {
    return this.getSubscriptionsByDate(date).length > 0;
  }

  hasNextPayments(date: Date): boolean {
    return this.getSubscriptionsByNextPaymentDate(date).length > 0;
  }

  getSubscriptionNames(date: Date): string {
    const subs = this.getSubscriptionsByDate(date);
    return subs.map(sub => sub.name).join(', ');
  }

  dateClass = (date: Date): string => {
    const classes = [];
    if (this.hasSubscriptions(date)) classes.push('has-subscription');
    if (this.hasNextPayments(date)) classes.push('has-next-payment');
    return classes.join(' ');
  };
}
