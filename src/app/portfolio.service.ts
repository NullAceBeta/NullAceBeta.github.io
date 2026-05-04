import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);
  
  private baseUrl = 'https://firestore.googleapis.com/v1/projects/my-cv-b5177/databases/(default)/documents';

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
  
  private extractCollection(response: any) {
    if (!response.documents) return [];
    return response.documents.map((doc: any) => this.extractFields(doc));
  }


  getHeader(): Observable<any> {
      // Nota: Asumimos que los datos del header están en un documento con id 'header' en la colección 'portfolio'
    return this.http.get(`${this.baseUrl}/portfolio/header`).pipe(map(res => this.extractFields(res)));
  }

  getEducation(): Observable<any[]> {
    return this.http.get(`${this.baseUrl}/education`).pipe(map(res => this.extractCollection(res)));
  }

  getWorkExperience(): Observable<any[]> {
    return this.http.get(`${this.baseUrl}/work-experience`).pipe(map(res => this.extractCollection(res)));
  }

  getSkills(): Observable<any[]> {
    return this.http.get(`${this.baseUrl}/skills`).pipe(map(res => this.extractCollection(res)));
  }

  getCertificates(): Observable<any[]> {
    return this.http.get(`${this.baseUrl}/certificates`).pipe(map(res => this.extractCollection(res)));
  }

  getLanguages(): Observable<any[]> {
    return this.http.get(`${this.baseUrl}/languages`).pipe(map(res => this.extractCollection(res)));
  }

  getInterests(): Observable<any[]> {
    return this.http.get(`${this.baseUrl}/interests`).pipe(map(res => this.extractCollection(res)));
  }
}
