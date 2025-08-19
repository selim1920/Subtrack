import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../../services/auth';
import { CommonModule } from '@angular/common'; // ← Important !

@Component({
  selector: 'app-dashboard-admin-layout',
  standalone: true,
  imports: [RouterModule, CommonModule], // ← Ajouté ici
  templateUrl: './dashboard-admin-layout.html',
  styleUrls: ['./dashboard-admin-layout.scss']
})
export class DashboardAdminLayout implements OnInit {
  currentUser: User | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.auth.getUser();
  }

  logout(): void {
    this.auth.logout().subscribe({
      next: () => {
        this.auth.clearStorage();
        this.router.navigate(['']);
      },
      error: (err) => console.error('Erreur logout', err)
    });
  }
}
