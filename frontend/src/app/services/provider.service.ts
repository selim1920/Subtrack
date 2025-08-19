import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

export interface Provider {
  id: number;
  nom: string;
  logo: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private apiUrl = 'http://localhost:8080/api/admin/providers';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.getToken();
    return token ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) } : {};
  }

  getProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.apiUrl, this.getHeaders());
  }

  addProvider(provider: Omit<Provider, 'id'>): Observable<Provider> {
    return this.http.post<Provider>(this.apiUrl, provider, this.getHeaders());
  }

  updateProvider(id: number, provider: Partial<Provider>): Observable<Provider> {
    return this.http.put<Provider>(`${this.apiUrl}/${id}`, provider, this.getHeaders());
  }

  deleteProvider(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}
