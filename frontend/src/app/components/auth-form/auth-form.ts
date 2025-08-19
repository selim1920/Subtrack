import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-form.html',
  styleUrls: ['./auth-form.scss'],
})
export class AuthForm implements AfterViewInit {
  @ViewChild('formContainer', { static: true }) formContainer!: ElementRef;

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    // Eye icon toggle
    const eyeIcons = this.formContainer.nativeElement.querySelectorAll('.eye-icon');
    eyeIcons.forEach((eyeIcon: HTMLElement) => {
      this.renderer.listen(eyeIcon, 'click', () => {
        const pwFields = eyeIcon.closest('.input-field')?.parentElement?.querySelectorAll('.password');
        pwFields?.forEach((input: HTMLInputElement) => {
          const isPassword = input.type === 'password';
          input.type = isPassword ? 'text' : 'password';
          eyeIcon.classList.toggle('bx-hide', !isPassword);
          eyeIcon.classList.toggle('bx-show', isPassword);
        });
      });
    });

    // Switch login/signup
    const links = this.formContainer.nativeElement.querySelectorAll('.link');
    links.forEach((link: HTMLElement) => {
      this.renderer.listen(link, 'click', (e: Event) => {
        e.preventDefault();
        this.formContainer.nativeElement.classList.toggle('show-signup');
      });
    });

    // Forgot password
    const forgotLink = this.formContainer.nativeElement.querySelector('.forgot-pass');
    if (forgotLink) {
      this.renderer.listen(forgotLink, 'click', (e: Event) => {
        e.preventDefault();
        if (!this.email) {
          alert('Veuillez saisir votre email avant de demander un reset');
          return;
        }
        this.authService.forgotPassword(this.email).subscribe({
          next: () => alert('Un email de réinitialisation a été envoyé. Vérifiez Mailhog.'),
          error: () => alert('Erreur lors de la demande de réinitialisation'),
        });
      });
    }
  }

  // Signup
  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    this.authService.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => alert('Inscription réussie !'),
      error: () => alert('Échec de l’inscription !'),
    });
  }

  // Login
  onLogin(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        alert('Connexion réussie !');
        this.authService.setToken(res.access_token);
        this.authService.setUser(res.user);
        const role = res.user?.role;
        if (role === 'admin') this.router.navigate(['/dashboard-admin']);
        else this.router.navigate(['/default']);
      },
      error: () => alert('Échec de la connexion !'),
    });
  }
}
