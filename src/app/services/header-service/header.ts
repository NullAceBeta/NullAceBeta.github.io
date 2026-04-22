import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Header } from '../../models/header/header.model'; // <-- Asegúrate de que apunte bien a tu modelo

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private dbPath = '/header'; // Verifica que tu colección en Firebase se llame exactamente "header"
  headerRef: AngularFirestoreCollection<Header>;

  constructor(private db: AngularFirestore) {
    this.headerRef = db.collection(this.dbPath);
  }

  getHeader(): AngularFirestoreCollection<Header> {
    return this.headerRef;
  }
}
