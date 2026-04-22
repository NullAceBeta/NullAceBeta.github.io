import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-work-experience',
  standalone: false,
  templateUrl: './work-experience.html'
})
export class WorkExperience implements OnInit {
  workList: any[] = [];

  constructor(private workService: WorkExperienceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.workService.getWorkExperience().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe((data: any[]) => {
      this.workList = data;
      this.cdr.detectChanges();
    });
  }
}
