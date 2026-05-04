import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);

  private readonly BASE =
    'https://firestore.googleapis.com/v1/projects/my-cv-b5177/databases/(default)/documents/portfolio';

  // ─── Firestore REST type deserializer ────────────────────────────────────
  // Firestore envuelve cada valor con su tipo:
  //   { "stringValue": "foo" } → "foo"
  //   { "arrayValue": { "values": [...] } } → [...]
  //   { "mapValue": { "fields": {...} } } → { ... } (recursivo)
  private parseValue(valueObj: any): any {
    if (valueObj == null) return null;

    if ('stringValue'  in valueObj) return valueObj.stringValue;
    if ('integerValue' in valueObj) return Number(valueObj.integerValue);
    if ('doubleValue'  in valueObj) return valueObj.doubleValue;
    if ('booleanValue' in valueObj) return valueObj.booleanValue;
    if ('nullValue'    in valueObj) return null;
    if ('timestampValue' in valueObj) return valueObj.timestampValue;

    if ('mapValue' in valueObj)
      return this.flattenDocument(valueObj.mapValue?.fields ?? {});

    if ('arrayValue' in valueObj)
      return (valueObj.arrayValue?.values ?? []).map((v: any) => this.parseValue(v));

    return null;
  }

  // Convierte el mapa de fields de Firestore en un objeto JS plano
  private flattenDocument(fields: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    for (const key in fields) {
      result[key] = this.parseValue(fields[key]);
    }
    return result;
  }

  // Extrae y aplana el documento completo que devuelve el endpoint REST
  private extractDoc(response: any): Record<string, any> {
    return this.flattenDocument(response?.fields ?? {});
  }

  // ─── Endpoints ───────────────────────────────────────────────────────────

  // header → objeto plano (campos directos, sin propiedad "lista")
  getHeader(): Observable<Record<string, any>> {
    return this.http.get(`${this.BASE}/header`).pipe(
      map(res => this.extractDoc(res)),
      catchError(() => of({}))   // 404 / red → objeto vacío
    );
  }

  // Factoría interna: lee un documento y devuelve su propiedad "lista"
  // Si el documento no existe (404) devuelve [] sin romper la app
  private getList(docName: string): Observable<any[]> {
    return this.http.get(`${this.BASE}/${docName}`).pipe(
      map(res => {
        const doc = this.extractDoc(res);
        // "lista" debe ser un array; si por alguna razón no lo es, devuelve []
        return Array.isArray(doc['lista']) ? doc['lista'] : [];
      }),
      catchError(() => of([]))
    );
  }

  getEducation():      Observable<any[]> { return this.getList('education');       }
  getWorkExperience(): Observable<any[]> { return this.getList('work-experience'); }
  getSkills():         Observable<any[]> { return this.getList('skills');          }
  getCertificates():   Observable<any[]> { return this.getList('certificates');    }
  getLanguages():      Observable<any[]> { return this.getList('languages');       }
  getInterests():      Observable<any[]> { return this.getList('interests');       }
}
