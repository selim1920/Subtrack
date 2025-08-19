export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  
  {
    id: 'other',
    title: 'subscription-item',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'subscription-form',
        title: 'Abonnement',
        type: 'item',
        url: '/subscription-form',
        classes: 'nav-item',
        icon: 'ti ti-credit-card'
      },
      
     
      {
      id: 'calendar',
      title: 'Calendar',
      type: 'item',
      classes: 'nav-item',
      url: '/calendar',
      icon: 'ti ti-calendar',  // ou autre icône
      breadcrumbs: false
    },
     
    ]
  }
];
