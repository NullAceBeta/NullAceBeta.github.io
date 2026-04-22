import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { WorkExperience } from '../../models/work-experience/work-experience.model';

@Injectable({ providedIn: 'root' })
export class WorkExperienceService {
  private dbPath = '/work-experience';
  workRef: AngularFirestoreCollection<WorkExperience>;

  constructor(private db: AngularFirestore) {
    this.workRef = db.collection(this.dbPath);
  }

  getWorkExperience(): AngularFirestoreCollection<WorkExperience> {
    return this.workRef;
  }
}
