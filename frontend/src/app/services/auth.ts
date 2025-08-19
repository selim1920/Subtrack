// src/app/services/auth.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const API_URL = 'http://localhost:8080/api';

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string; // Le backend doit renvoyer ce champ
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  /** Inscription */
  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${API_URL}/register`, data);
  }

  /** Connexion + stockage du token et de l'utilisateur */
  login(data: { email: string; password: string }): Observable<{ access_token: string; user: User }> {
    return this.http.post<{ access_token: string; user: User }>(`${API_URL}/login`, data).pipe(
      tap(response => {
        const { access_token, user } = response;
        this.setToken(access_token);
        this.setUser(user);
        localStorage.setItem('user_id', String(user.id));
      })
    );
  }

  /** Déconnexion */
  logout(): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return of({ message: 'Déjà déconnecté' });
    }
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(`${API_URL}/logout`, {}, { headers }).pipe(
      tap(() => this.clearStorage())
    );
  }

  /** Sauvegarde utilisateur */
  setUser(user: User) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  /** Récupération utilisateur */
  getUser(): User | null {
    if (this.currentUser) return this.currentUser;
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.currentUser = JSON.parse(userJson);
      return this.currentUser;
    }
    return null;
  }

  /** Sauvegarde token */
  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  /** Récupération token */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /** Nettoyer stockage */
  clearStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    this.currentUser = null;
  }

  /** Vérifie si l'utilisateur est admin */
  isAdmin(): boolean {
    const user = this.getUser();
    return !!user && user.role === 'admin';
  }

  /** Récupérer tous les utilisateurs (admin uniquement) */
  getUsers(): Observable<User[]> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.get<User[]>(`${API_URL}/admin/users`, { headers });
  }

  /** Ajouter un nouvel utilisateur (admin) */
  addUser(user: Partial<User>): Observable<User> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.post<User>(`${API_URL}/admin/users`, user, { headers });
  }

  /** Mettre à jour un utilisateur existant (admin) */
  updateUser(user: User): Observable<User> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.put<User>(`${API_URL}/admin/users/${user.id}`, user, { headers });
  }

  /** Supprimer un utilisateur (admin) */
  deleteUser(id: number): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.delete(`${API_URL}/admin/users/${id}`, { headers });
  }
  /** Demander un reset password */
forgotPassword(email: string): Observable<any> {
  return this.http.post(`${API_URL}/forgot-password`, { email });
}

/** Réinitialiser le mot de passe */
resetPassword(data: { email: string; token: string; password: string; password_confirmation: string }): Observable<any> {
  return this.http.post(`${API_URL}/reset-password`, data);
}

}
