import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.scss'],
})
export class ResetPasswordComponent {
  email = '';
  password = '';
  confirmPassword = '';
  token = '';

  constructor(private authService: AuthService, private router: Router) {
    // Récupération des query params
    const params = new URLSearchParams(window.location.search);
    this.token = params.get('token') || '';
    this.email = params.get('email') || '';
  }

  onReset(): void {
    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    this.authService.resetPassword({
      email: this.email,
      token: this.token,
      password: this.password,
      password_confirmation: this.confirmPassword,
    }).subscribe({
      next: () => {
        alert('Mot de passe réinitialisé avec succès !');
        this.router.navigate(['/auth-form']); // Retour page login
      },
      error: () => alert('Erreur lors de la réinitialisation du mot de passe'),
    });
  }
}
