import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Languages } from '../../models/languages/languages.model';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  private languagesCollection: AngularFirestoreCollection<Languages>;

  constructor(private firestore: AngularFirestore) {
    this.languagesCollection = this.firestore.collection<Languages>('languages');
  }

  getLanguages() {
    return this.languagesCollection;
  }
}
