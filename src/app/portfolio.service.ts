import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);
  
  // URL apuntando a la colección 'portfolio' dentro de tu base de datos 'my-cv'
  private baseUrl = 'https://firestore.googleapis.com/v1/projects/my-cv-b5177/databases/(default)/documents/portfolio';

  private parseValue(valueObj: any): any {
    if (!valueObj) return null;
    if (valueObj.stringValue !== undefined) return valueObj.stringValue;
    if (valueObj.integerValue !== undefined) return parseInt(valueObj.integerValue, 10);
    if (valueObj.doubleValue !== undefined) return parseFloat(valueObj.doubleValue);
    if (valueObj.booleanValue !== undefined) return valueObj.booleanValue;
    if (valueObj.mapValue !== undefined) return this.extractFields({ fields: valueObj.mapValue.fields });
    if (valueObj.arrayValue !== undefined) {
      return valueObj.arrayValue.values ? valueObj.arrayValue.values.map((v: any) => this.parseValue(v)) : [];
    }
    return null;
  }

  private extractFields(document: any) {
    if (!document || !document.fields) return {};
    const extracted: any = {};
    for (const key in document.fields) {
      extracted[key] = this.parseValue(document.fields[key]);
    }
    return extracted;
  }

  // Peticiones HTTP apuntando a documentos específicos dentro de la colección 'portfolio'
  getHeader(): Observable<any> {
    return this.http.get(`${this.baseUrl}/header`).pipe(
      map(res => this.extractFields(res)),
      catchError(() => of({})) // Si el documento no existe (404), devuelve un objeto vacío
    );
  }

  getEducation(): Observable<any[]> {
    return this.http.get(`${this.baseUrl}/education`).pipe(
      map(res => this.extractFields(res)['lista'] || []),
      catchError(() => of([])) // Si el documento no existe (404), devuelve un array vacío
    );
  }

  getWorkExperience(): Observable<any[]> {
    return this.http.get(`${this.baseUrl}/work-experience`).pipe(
      map(res => this.extractFields(res)['lista'] || []),
      catchError(() => of([]))
    );
  }

  getSkills(): Observable<any[]> {
    return this.http.get(`${this.baseUrl}/skills`).pipe(
      map(res => this.extractFields(res)['lista'] || []),
      catchError(() => of([]))
    );
  }

  getCertificates(): Observable<any[]> {
    return this.http.get(`${this.baseUrl}/certificates`).pipe(
      map(res => this.extractFields(res)['lista'] || []),
      catchError(() => of([]))
    );
  }

  getLanguages(): Observable<any[]> {
    return this.http.get(`${this.baseUrl}/languages`).pipe(
      map(res => this.extractFields(res)['lista'] || []),
      catchError(() => of([]))
    );
  }

  getInterests(): Observable<any[]> {
    return this.http.get(`${this.baseUrl}/interests`).pipe(
      map(res => this.extractFields(res)['lista'] || []),
      catchError(() => of([]))
    );
  }
}
