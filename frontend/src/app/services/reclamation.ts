import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReclamationData {
  id?: number;
  name: string;
  email: string;
  message: string;
  status?: 'pending' | 'resolved' | 'rejected';
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); // Corrected key
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // Admin: Get all reclamations
  getReclamations(): Observable<ReclamationData[]> {
    return this.http.get<ReclamationData[]>(`${this.apiUrl}/admin/reclamations`, { headers: this.getAuthHeaders() });
  }

  // Admin: Get one reclamation
  getReclamation(id: number): Observable<ReclamationData> {
    return this.http.get<ReclamationData>(`${this.apiUrl}/admin/reclamations/${id}`, { headers: this.getAuthHeaders() });
  }

  // Public: Add reclamation
  addReclamation(reclamation: ReclamationData): Observable<ReclamationData> {
    return this.http.post<ReclamationData>(`${this.apiUrl}/reclamations`, reclamation);
  }

  // Admin: Update reclamation
  updateReclamation(id: number, reclamation: ReclamationData): Observable<ReclamationData> {
    return this.http.put<ReclamationData>(`${this.apiUrl}/admin/reclamations/${id}`, reclamation, { headers: this.getAuthHeaders() });
  }

  // Admin: Delete reclamation
  deleteReclamation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/reclamations/${id}`, { headers: this.getAuthHeaders() });
  }
}
