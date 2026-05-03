// src/app/portfolio.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  // URL base de tu API en producción
  private apiUrl = 'https://cv-manager-hh1l.onrender.com/api';

  constructor(private http: HttpClient) {}

  getHeader(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/header`);
  }

  getEducation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/education`);
  }

  getWorkExperience(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/work-experience`);
  }

  getSkills(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/skills`);
  }

  getCertificates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/certificates`);
  }

  getLanguages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/languages`);
  }

  getInterests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/interests`);
  }
}
