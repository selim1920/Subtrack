import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { DashboardAdminLayout } from './pages/admin/dashboard-admin-layout/dashboard-admin-layout';

const routes: Routes = [
  // Page d'accueil
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page').then(c => c.HomePage)
  },

  // Pages avec layout Admin standard
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () =>
          import('./demo/dashboard/default/default.component').then(c => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () =>
          import('./demo/elements/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () =>
          import('./demo/elements/element-color/element-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () =>
          import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'subscription-form',
        loadComponent: () =>
          import('./subscriptions/subscription-form/subscription-form').then(c => c.SubscriptionForm)
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./components/calendar-view/calendar-view').then(c => c.CalendarView)
      }
    ]
  },

 // ⚠️ Pages avec layout dashboard-admin personnalisé
  {
    path: 'dashboard-admin',
    component: DashboardAdminLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/admin/dashboard-admin/dashboard-admin').then(c => c.DashboardAdmin)
      },
      {
        path: 'subscription-list',
        loadComponent: () =>
          import('./pages/admin/subscription-list/subscription-list').then(c => c.AdminSubscriptionList)
      },
      {
  path: 'provider-list',
  loadComponent: () =>
    import('./pages/admin/provider-list/provider-list').then(c => c.ProviderListComponent)
}

      
     
    ]
  },

  // ✅ Pages avec layout invité (guest)
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () =>
          import('./demo/pages/authentication/authentication.module').then(m => m.AuthenticationModule)
      },
      {
        path: 'auth-form',
        loadComponent: () =>
          import('./components/auth-form/auth-form').then(m => m.AuthForm)
      },
      {
  path: 'reset-password',
  loadComponent: () =>
    import('./components/auth-form/reset-password/reset-password').then(m => m.ResetPasswordComponent)
}

      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}